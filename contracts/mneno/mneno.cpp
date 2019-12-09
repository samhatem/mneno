#include "mneno.hpp"
using namespace eosio;
using std::string;
using std::vector;
using std::set;

CONTRACT mneno : public contract
{
  using contract::contract;
public:

  explicit mneno(name receiver, name code, datastream<const char*> ds):
    contract(receiver, code, ds),
    _posts(get_first_receiver(),get_first_receiver().value),
    _payments(get_first_receiver(),get_first_receiver().value){}


  [[eosio::action]]
  uint128_t registerpost(name author, const uint64_t timestamp, const uint64_t price, string title) {
    require_auth(author);

    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp;
    auto post = _posts.find(skey);
    check(post == _posts.end(), "A post with this key has already been added");

    _posts.emplace(_self, [&](auto& p) {
      p.postid = skey;
      p.author = author;
      p.price = price;
      p.timestamp = timestamp;
      p.title = title;
    });

    return skey;
  }

  // get price of an article
  [[eosio::action]]
  uint64_t getprice(const uint128_t postskey) {
    auto post = _posts.get(postskey);
    check(post.postid == postskey, "Invalid Article ID");
    return post.price;
  }

  [[eosio::action]]
  void pay(name from, uint64_t price, uint128_t postskey) {
    // asset quantity
    require_auth(from);
    uint128_t payment_skey = static_cast<uint128_t>(from.value) << 64 | postskey >> 64;

    auto payment = _payments.find(payment_skey);
    check(payment == _payments.end(), "Payment for content already exists.");

    auto post = _posts.get(postskey);

    check(post.price == 0 || price >= post.price, "Insufficient funds supplied");
    _payments.emplace(_self, [&](auto& payment) {
      payment.paymentid = payment_skey;
      payment.postid = postskey;
      payment.payer = from;
    });

    transferfunds(from, post.author, price, post.title);
  }

  [[eosio::action]]
  bool checkpayment(string from, uint128_t postskey) {
    auto payment = _payments.find(postskey);
    return payment != _payments.end();
  }

private:

  void transferfunds(name from, name to, uint64_t price, string postName) {
    action{
      permission_level{ from, "active"_n },
      "eosio.token"_n,
      "transfer"_n,
      std::make_tuple(from, to, price, string("payment for mneno post: " + postName))
    }.send();
  }

  struct [[eosio::table]] post_struct
  {
    name author;
    uint64_t price;
    uint64_t postid;
    uint64_t timestamp;
    string title;
    uint128_t primary_key() const { return postid; }
  };

  typedef eosio::multi_index<name("posttable"), post_struct> post_table;
  post_table _posts;

  struct [[eosio::table]] payment_struct
  {
    uint64_t paymentid;
    name payer;
    uint64_t postid;
    uint64_t primary_key() const { return paymentid; }
  };

  typedef eosio::multi_index<name("paymenttable"), payment_struct> payment_table;
  payment_table _payments;
};
