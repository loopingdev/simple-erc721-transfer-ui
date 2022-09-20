import Header from '../components/Header'
import Meta from '../components/Meta'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

const Home = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  let transferNFT = async function() {
    document.getElementById("txHash").innerHTML = "";
    let contractAddress = document.getElementById("inputContractAddress").value;
    let tokenId = document.getElementById("inputTokenId").value;
    let recipientAddress = document.getElementById("inputRecipientAddress").value;
    console.log(contractAddress, tokenId, recipientAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }];
    const contract = new ethers.Contract(contractAddress, abi, signer);
    contract.transferFrom(account, recipientAddress, tokenId).then((result) => {
      console.log(result);
      document.getElementById("txHash").innerHTML = "Transaction Hash: " + result.hash;
    });
  }

  return (
    <Container>
      <div className='starter-template text-center mt-5'>
        {status === "initializing" ?
          <p>Synchronisation with MetaMask ongoing...</p>
        : status === "unavailable" ?
          <p>MetaMask not available :(</p>
        : status === "notConnected" ?
          <div><Button variant="primary" onClick={connect}>Connect to MetaMask</Button></div>
        : status === "connecting" ?
          <p>Connecting...</p>
        : status === "connected" ?
          <div>
            <p>Connected account: {account}</p>
            <p>Chain ID: {parseInt(chainId)}</p>
            <br /><br />
            <Form onSubmit={(e) => {e.preventDefault();}}>
              <Form.Label><h4>Transfer NFT</h4></Form.Label>
              <Form.Control id="inputContractAddress" type="text" placeholder="ERC721 Contract Address" /><br />
              <Form.Control id="inputTokenId" type="text" placeholder="Token ID" /><br />
              <Form.Control id="inputRecipientAddress" type="text" placeholder="Recipient Address" /><br />
              <Button variant="primary w-100 btn-lg" type="submit" onClick={transferNFT}>Transfer</Button>
            </Form>
            <br />
            <p id="txHash"></p>
            <br /><br />
            <p>By Mint Square | <a target="_blank" href="https://github.com/mintsquare/simple-erc721-transfer-ui">Source Code</a></p>
          </div>
        :
          <p></p>
        }
      </div>
    </Container>
  )
}

export default Home