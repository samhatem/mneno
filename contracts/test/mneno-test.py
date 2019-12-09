from eosfactory.eosf import *
import eosfactory.core.setup as setup
import unittest
import os

CONTRACT_DIR = os.path.join(os.path.split(os.getcwd())[0], 'mneno')

MASTER = MasterAccount()
ALICE = Account()
BOB = Account()
CAROL = Account()

class Test(unittest.TestCase):
    def run(self, result=None):
        super().run(result)

    @classmethod
    def setUpClass(cls):
        SCENARIO('''Resetting local EOSIO node''')

        reset()  # Reset local node

        SCENARIO('''Build and deploy smart contract''')

        # Set up and deploy contract

        create_master_account('MASTER')
        create_account('HOST', MASTER)
        contract = Contract(HOST, CONTRACT_DIR)
        contract.build()
        contract.deploy()

        SCENARIO('''Create mock accounts''')

        # Set up mock user accounts
        create_account('ALICE', MASTER)
        create_account('CAROL', MASTER)
        create_account('BOB', MASTER)

    def test_register(self):

        SCENARIO('''Registering a post''')
        post_data = {'author': BOB,'timestamp': 3123129891,'price': 1,'title': 'First post'}
        HOST.push_action('registerpost', post_data, BOB)

        postid = None
        post_table = HOST.table('posttable', HOST)
        post_rows = post_table.json['rows']
        for post in post_rows:
            if post['author'] == BOB.name and post['timestamp'] \
                == post_data['timestamp']:
                postid = post['postid']
                break

        self.assertIsNotNone(postid)

        with self.assertRaises(Error):
            HOST.push_action('registerpost', post_data, BOB)

        SCENARIO('''PAYING FOR A POST''')

        payment_data = {'from': ALICE, 'price': 1, 'postskey': 3123129891}

        HOST.push_action('pay', payment_data, ALICE)

        paymentid = None
        payment_table = HOST.table('paymenttable', HOST)
        payment_rows = payment_table.json['rows']
        for payment in payment_rows:
            if payment['payer'] == ALICE.name and payment['postid'] \
                == 3123129891:
                paymentid = payment['paymentid']
                break

        self.assertIsNotNone(paymentid)

        with self.assertRaises(Error):
            HOST.push_action('pay', payment_data, ALICE)

        SCENARIO('''TESTING CHECK PAYMENT''')
        check_data = {'from': ALICE, 'postskey': 3123129891}

        HOST.push_action('checkpayment', check_data, BOB)

    @classmethod
    def tearDownClass(cls):
        SCENARIO('''Stopping local EOS node''')
        stop()

if __name__ == '__main__':
    unittest.main()
