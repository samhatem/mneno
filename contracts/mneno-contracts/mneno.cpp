#include "mneno.hpp"
using namespace eosio;
using std::string;
using std::vector;
using std::set;

CONTRACT mnenopost : public contract
{
  using contract::contract;
public:

  explicit mnenopost(name receiver, name code, datastream<const char*> ds):
    contract(receiver, code, ds),
    _posts(get_first_receiver(),get_first_receiver().value),
    _payments(get_first_receiver(),get_first_receiver().value){}


  ACTION registerpost(const name author, const uint64_t timestamp, const uint64_t price, string title) {
    require_auth(author);

    auto post_index = _posts.get_index<name("skey")>();
    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp;
    auto post = post_index.find(skey);
    check(post == post_index.end(), "Post with timestamp and author already exists.");

    _posts.emplace(author -> value, [&](auto &p) {
      p.postid = _posts.available_primary_key();
      p.skey = skey;
      p.author = author -> value;
      p.price = price;
      p.timestamp = timestamp;
      p.title = title;
    });
  }

  // get price of an article
  uint64_t getprice(const uint128_t postskey) {
    auto post_index = _posts.get_index<name("skey")>();
    auto post = post_index.find(postskey);
    check(post -> skey == postskey, "Invalid Article ID");
    return post -> price;
  }

  ACTION pay(name from, asset quantity, const uint128_t postskey) {
    require_auth(from);
    uint128_t payment_skey = static_cast<uint128_t>(from.value) << 64 | postskey >> 64;
    auto payment_index = _payments.get_index<name("skey")>();
    auto payment = payment_index.find(payment_skey);
    check(payment == payment_index.end(), "Payment for content already exists.");

    auto post_index = _posts.get_index<name("skey")>();
    auto post = post_index.find(postskey);
    check(post == post_index.end(), "Post secondary key is not valid.")
    check(quantity >= post -> price, "Insufficient funds supplied");
    _payments.emplace(from.value, [&](auto &payment) {
      payment.paymentid = _payments.available_primary_key();
      payment.postid = post -> postid;
      payment.payer = from -> value;
    });

    transferFunds(post -> author, quantity, post -> title);
  }

  // function to confirm/deny whether a public key has paid
  bool checkpayment(name from, uint128_t postskey) {
    uint128_t payment_skey = static_cast<uint128_t>(from.value) << 64 | postskey >> 64;
    auto payment_index = _payments.get_index<name("skey")>();
    auto payment = payment_index.find(skey);
    return payment != payment_index.end();
  }

  // function to change price of articles
  ACTION changePrice(uint64_t newprice) {
    auto itr = _posts.find(postid);
    check(post.postid != _posts.end(), "Invalid Article ID")
    _posts.modify(*itr, get_self(),[&](auto &p) {
      p.price = newprice;
    }
    check(itr -> price == newprice, "Price not modified");
  }

private:

  const symbol token_symbol;

  void transferFunds(name to, asset quantity, string postName) {
    action(
      permission_level{ _self, "active"_n },
      "eosio.token"_n,
      "transfer"_n,
      std::make_tuple(_self, to, quantity, string("payment for mneno post: " + postName))
    ).send();
  }

  struct [[eosio::table]] post_struct
  {
    name author;
    uint128_t skey;
    uint64_t price;
    uint64_t postid;
    uint64_t timestamp;
    string title;
    uint128_t primary_key() const { return skey; }
    //uint128_t by_skey() const { return skey; }
  };

  typedef eosio::multi_index<name("posttable"), post_struct>
    //indexed_by< name("byskey"), const_mem_fun<post_struct, uint128_t, &post_struct::by_skey>
//  >
  post_table;
  post_table _posts;

  struct [[eosio::table]] payment_struct
  {
    uint64_t paymentid;
    uint128_t skey;
    name payer;
    uint64_t postid;
    uint64_t primary_key() const { return skey; }
    //uint128_t by_skey() const { return skey; }
  };

  typedef eosio::multi_index<name("paymenttable"), payment_struct>
      //indexed_by <name("byskey"), const_mem_fun < payment_struct, uint128_t, &payment_struct::by_skey>
   //>
   payment_table;
   payment_table _payments;
  };

EOSIO_DISPATCH(mnenopost, (registerpost)(changeprice)(pay)(getPrice)(checkpayment))
