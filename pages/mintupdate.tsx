import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useStorageUpload } from "@thirdweb-dev/react"
import { SetStateAction, useEffect, useState } from "react"
import React from 'react'
import { useAccount } from "wagmi";
import { ConnectWallet, useAddress, useSDK , useContract , useContractRead,useContractWrite  } from "@thirdweb-dev/react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";

const Home: NextPage = () => {
	const [file, setFile] = useState<File | null>(null)
    const [percent, setPercent] = useState("");
      const [myCar, setMyCar] = useState("nft-collection");
    const [image, setImage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setUri] = useState("");
  const [_tokenId, set_tokenId] = useState("");
  const [_amount, set_amount] = useState("");
  const [displayv, set_displayv] = useState("none");
//   0xc6Adc341f0e2693803021DFc6744DcCe6cab7dab contractid
// 0x1A409E1473C6a92E45DbF7363C1532D5D3A1a3dF myid
 const contractaddress = '';
   const [contractName, setcontractName] = useState(contractaddress);

   // const router = useRouter();
    const { address } = useAccount();
  const sdk = useSDK();
// "0x22bf39DB3AddE6DB848B20BEE9798009Da03820E"
    const { contract } = useContract(contractName);
console.log('contract', contract);
const metadata = {
  "name": name,
    "description": description,
    "image": image,
    "external_url": "",
    "attributes": [
        {
            "trait_type": "Membership",
            "value": "bluevinci"
        }
    ]
};

    const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")

  const call = async () => {


// setUri('https://bafybeiacfejonfjuk5vdbdum4cxsc3j7sjebkjs6imydsrl6p3sofx4gz4.ipfs.dweb.link/');

    
    try {


      if(myCar == 'nft-collection'){

   
      const data = await mintTo({ args: [recipient, uri] });
      console.info("contract call successs", data);
      alert('success');
   }else{



    let id = Number(_tokenId);
    let amount = Number(_amount);
    // const data = await contract.call("mintTo", [recipient, _tokenId, uri, _amount])
         const data = await mintTo({ args: [recipient, id, uri, amount] });

   }


    } catch (err) {
      console.error("contract call failure", err);
      alert('error');
    }
  }

const call1 = async() =>{

    console.log('image',image);

    const uploadUrl = await upload({
			data: [metadata],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true,
			},
		})
        let newver = uploadUrl.toString();
        console.log('url', newver)
        setUri(newver);

}





useEffect(()=>{

    if(image){


call1()




    if(image && recipient && uri){
        console.log('uri called')
        console.log('percentinside',percent)
        console.log('recipientinside',recipient)

    call();  
     console.log('call done');
       setImage('');
    }
    }


},[image,uri])


	const { mutateAsync: upload } = useStorageUpload()


        const uploadToIpfs = async (event: { preventDefault: () => void }) => {
    //name , symbol type
    event.preventDefault();
		const uploadUrl = await upload({
			data: [file],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true,
			},
		})
    // setFile(uploadUrl);
    let newver = uploadUrl.toString();
    console.log('newver',newver);
    setImage(newver);
	// 	console.log("Uploaded to IPFS: " + uploadUrl)
    //  console.log('recipient',recipient)
    //  console.log('percent',percent)
    // //  setTimeout(function(){
    //       console.log('percent2',percent)
       
    //     }, 4000);
console.log('working');


	}
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMyCar(event.target.value);
    if(event.target.value == 'nft-collection'){
      set_displayv('none');
    }else{
      set_displayv('block');
    }
    
  }

	return (
         <Layout>
      <Flex
        direction="column"
        align="center"
        css={{ py: '200px', px: '$3', textAlign: 'center' }}
      >
        
		<div>
            <form onSubmit={uploadToIpfs}>

              
              <label>Contract Type:&nbsp;
            
            
                <select  onChange={handleChange} className="form-control">
        <option value="nft-collection">721 </option>
        <option value="edition">1155</option>
      </select> 
   </label> 

      <br></br>
      <br></br> 
         <label>Contract  Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={contractName}
          onChange={(e) => setcontractName(e.target.value)}
        />
      </label>
      <br></br>
      <br></br> 
                 
      <label style={{display:displayv}}> TokenId:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={_tokenId}
          onChange={(e) => set_tokenId(e.target.value)}
        />
         <br/>
      <br/>
      </label>
     
      <label style={{display:displayv}}>Amount :&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={_amount}
          onChange={(e) => set_amount(e.target.value)}
        />
        <br/>
      <br/>
      </label>
      
      <label>Enter  Discription:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br/>
      <br/>
      <label>Enter your  address:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>

      <br></br>
      <br></br>
			<input
				type="file"
				onChange={(e) => {
					if (e.target.files) {
						setFile(e.target.files[0])
					}
				}}
			/>
            <br></br>
      <br></br>
			<Button  type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Mint Now
      </Button>
            </form>
		</div>
        </Flex>
        </Layout>
	)
}

export default Home
