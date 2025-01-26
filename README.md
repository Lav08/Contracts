# **Bridge între Ethereum și Sui Blockchain**

Acest proiect implementează un **bridge** centralizat între două blockchain-uri: **Ethereum** și **Sui**, utilizând contracte inteligente pentru transferul de token-uri între cele două lanțuri. Utilizatorii pot transfera token-uri între cele două blockchain-uri printr-o interfață simplă.

---

## **Funcționalități**
- Transfer de token-uri între Ethereum și Sui:
  - **Burn** pe lanțul sursă.
  - **Mint** pe lanțul destinație.
- **Interfață web** simplă pentru utilizatori.
- **Backend centralizat** pentru gestionarea tranzacțiilor între blockchain-uri.

---

## **Tehnologii Utilizate**
- **Frontend:**
  - HTML, CSS, JavaScript
- **Backend:**
  - Node.js, Express.js
  - `ethers.js` pentru interacțiunea cu Ethereum.
  - `@mysten/sui.js` pentru interacțiunea cu Sui.
- **Smart Contracts:**
  - **Ethereum:** Solidity (OpenZeppelin ERC20).
  - **Sui:** Move.

---

## **Structura Proiectului**
Proiectul este organizat astfel:
```
project-root/
├── backend/                # Logica backend
│   ├── index.js            # Endpoint-uri API
│   ├── .env                # Variabile de mediu
├── Contract/
│   ├── Ethereum/
│   │   ├── ethers.js       # Funcții pentru Ethereum
│   │   └── IBTToken.sol    # Contract Ethereum
│   ├── Sui/
│       ├── sui.js          # Funcții pentru Sui
│       └── IBTToken.move   # Contract Sui
├── frontend/               # Interfața utilizatorului
│   ├── index.html          # HTML-ul principal
│   ├── script.js           # Logica frontend
│   └── style.css           # Stiluri CSS
├── package.json            # Dependențe proiect
└── README.md               # Documentație proiect
```

---

## **Cum să Rulezi Proiectul Local**
Urmează acești pași pentru a rula proiectul pe mașina ta locală:

### **1. Clonarea Proiectului**
Clonează acest repository pe mașina ta locală:
```bash
git clone https://github.com/username/bridge-ethereum-sui.git
cd bridge-ethereum-sui
```

### **2. Instalarea Dependențelor**
Instalează toate dependențele necesare:
```bash
npm install
```

### **3. Configurarea Variabilelor de Mediu**
Creează un fișier `.env` în folderul `backend/` și adaugă următoarele:
```
ETH_RPC_URL=http://localhost:8545         # URL-ul RPC pentru Ethereum
SUI_RPC_URL=http://localhost:9000         # URL-ul RPC pentru Sui
PRIVATE_KEY=YOUR_PRIVATE_KEY              # Cheia privată pentru tranzacții
```

### **4. Pornirea Backend-ului**
Navighează în folderul `backend/` și pornește serverul:
```bash
node backend/index.js
```

Serverul va fi disponibil la: **http://localhost:3000**

### **5. Deschiderea Frontend-ului**
Deschide fișierul `frontend/index.html` într-un browser web pentru a accesa interfața utilizatorului.

---

## **Fluxul Funcțional**
1. Utilizatorul completează formularul în frontend, selectând:
   - Lanțul sursă (Ethereum sau Sui).
   - Lanțul destinație.
   - Cantitatea de token-uri de transferat.
2. Cererea este trimisă către backend printr-un endpoint REST (`/bridge`).
3. Backend-ul:
   - Apelează contractele inteligente:
     - **Burn** pe lanțul sursă.
     - **Mint** pe lanțul destinație.
   - Trimite un răspuns către frontend cu detalii despre tranzacție.
4. Frontend-ul afișează un mesaj cu succesul sau eroarea tranzacției.

---

## **Contracte Inteligente**
### **Ethereum (Solidity)**
Contractul Ethereum folosește ERC20 și permite doar proprietarului să creeze (`mint`) sau să distrugă (`burn`) token-uri.
```solidity
function mint(address to, uint256 amount) external {
    require(msg.sender == owner, "Only owner can mint");
    _mint(to, amount);
}

function burn(address from, uint256 amount) external {
    require(msg.sender == owner, "Only owner can burn");
    _burn(from, amount);
}
```

### **Sui (Move)**
Contractul Sui implementează funcționalități similare cu ERC20, utilizând metode specifice Move:
```move
public entry fun mint(cap: &MintCap, amount: u64, ctx: &mut TxContext) {
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
```

---

## **Endpoint-uri Backend**
### **POST /bridge**
Endpoint-ul `/bridge` primește detalii despre tranzacție și gestionează interacțiunea între cele două lanțuri.

Exemplu de cerere:
```json
{
    "sourceChain": "Sui",
    "destinationChain": "Ethereum",
    "amount": 10,
    "userAddress": "0x123...",
    "coinObjectId": "COIN_OBJECT_ID"
}
```

---

## **Cum Funcționează Bridge-ul?**
1. **Burn pe lanțul sursă**: Token-urile sunt distruse pe blockchain-ul sursă.
2. **Mint pe lanțul destinație**: Token-urile sunt create pe blockchain-ul destinație.
3. Utilizatorul primește echivalentul token-urilor pe lanțul destinație.

---

## **Cerinte pentru Viitor**
- Implementarea fluxului **Ethereum -> Sui**.
- Adăugarea suportului pentru mai multe lanțuri blockchain.
- Optimizarea interfeței utilizatorului.

