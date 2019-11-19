#include "mneno.hpp"
using namespace eosio;
using std::string;
using std::vector;

CONTRACT mnenopost : public contract
{
  using contract::contract;
public:

  explicit mnenopost(name receiver, name code, datastream<const char*> ds):
    contract(receiver, code, ds),
    _posts(receiver, receiver.value),
    _payments(receiver, receiver.value){}


  ACTION registerpost(const name author, const uint64_t timestamp, const string &caption, const uint64_t price) {
    require_auth(author);

    auto post_index = _posts.get_index<name("byskey")>();
    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp;
    auto post = post_index.find(skey);
    eosio_assert(post = post_index.end(), "Post with timestamp and author already exists.");

    _posts.emplace(get_self(), [&](auto &p) {
      p.postid = _posts.available_primary_key();
      p.skey = skey;
      p.author = author;
      p.caption = caption;
      p.price = price;
      p.timestamp = timestamp;
    });
  }

  // get price of an article
  static asset getprice(const uint_t postid) {

  }

  ACTION pay(name from, asset quantity, const uint_t postid) {}


  // function to confirm/deny whether a public key has paid
  static bool checkpayment(name from, uint_t postid) {}

  // function to change price of articles
  ACTION changePrice() {}

private:

  TABLE post_struct
  {
    name author;
    uint128_t skey;
    uint64_t price;
    uint64_t postid;
    uint64_t timestamp;
    string caption;
    uint64_t primary_key() const { return postid; }
    uint128_t by_skey() const { return skey; }
    uint64_t by_author() const { return author.value; }
  }

  typedef eosio::multi_index<name("poststruct"), post_struct,
    indexed_by < name("byskey"), const_mem_fun < post_struct, uint128_t, &post_struct::by_skey>>,
    indexed_by < name("byauthor"), const_mem_fun < post_struct, uint64_t, &post_struct::by_author>>
  >
  post_struct;
  post_struct _posts;

  TABLE payment_struct
  {
    name payer;
    uint64_t postid;
    uint64_t primary_key() const { return postid; }
    uint64_t by_postid() const { return postid; }
    uint64_t by_payer() const { return payer.value; }
  }

  typdef eosio::multi_index<name("paymentstruct"), payment_struct,
    indexed_by < name("bypostid"), const_mem_fun < payment_struct, uint64_t, &payment_struct::by_postid>>,
    indexed_by < name("bypayer"), const_mem_fun < payment_struct, uint64_t, &payment_struct::by_payer>>
  >
  payment_struct;
  payment_struct _payments;
};

EOSIO_DISPATCH(mnenopost, (registerpost)(changeprice)(pay)(getPrice)(checkpayment))
