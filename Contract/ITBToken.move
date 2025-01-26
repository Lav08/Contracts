module 0x0::IBTToken {
    use 0x2::tx_context::{TxContext, sender};
    use 0x2::object::{UID, new, delete};         
    use 0x2::transfer::{transfer, public_transfer};

    struct IBTCoin has key, store {
        id: UID,
        balance: u64,
        owner: address,
    }

    struct MintCap has key, store {
        id: UID,
        owner: address,
    }

    public entry fun initialize(ctx: &mut TxContext) {
        let deployer = sender(ctx);
        let mint_cap = MintCap {
            id: new(ctx),
            owner: deployer,
        };
   
        transfer(mint_cap, deployer);
    }

    public entry fun mint(cap: &MintCap, amount: u64, ctx: &mut TxContext) {
        assert!(cap.owner == sender(ctx), 1001); 

        let coin = IBTCoin {
            id: new(ctx),
            balance: amount,
            owner: sender(ctx),
        };

        public_transfer(coin, sender(ctx));
    }

    public entry fun burn(cap: &MintCap, coin: IBTCoin) {
        assert!(cap.owner == coin.owner, 1002);

        let IBTCoin { id, balance: _, owner: _ } = coin;
        delete(id);
    }
}
