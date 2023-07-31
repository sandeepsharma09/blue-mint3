import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useStorageUpload } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import React from 'react'
import { useAccount } from "wagmi";
import { ConnectWallet, useAddress, useSDK , useContract , useContractRead,useContractWrite  } from "@thirdweb-dev/react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";

const Home: NextPage = () => {
	const [file, setFile] = useState<File | null>(null)
    const [percent, setPercent] = useState("");
  const [recipient, setRecipient] = useState("");
//   0xc6Adc341f0e2693803021DFc6744DcCe6cab7dab
 const contractaddress = '';
   const [contractName, setcontractName] = useState(contractaddress);

   // const router = useRouter();
    const { address } = useAccount();
  const sdk = useSDK();
// "0x22bf39DB3AddE6DB848B20BEE9798009Da03820E"
    const { contract } = useContract(contractName);
console.log('contract', contract);

    const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")

  const call = async () => {
    try {
      const data = await mintTo({ args: [recipient, percent] });
      console.info("contract call successs", data);
      alert('success');
    } catch (err) {
      console.error("contract call failure", err);
      alert('error');
    }
  }



useEffect(()=>{

    if(percent && recipient){
        console.log('percentinside',percent)
        console.log('recipientinside',recipient)

     call();  
     console.log('done');
       setPercent('');
    }



},[percent])


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
    setPercent(newver);
		console.log("Uploaded to IPFS: " + uploadUrl)
     console.log('recipient',recipient)
     console.log('percent',percent)
     setTimeout(function(){
          console.log('percent2',percent)
       
        }, 4000);
console.log('working');

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
                 
                    <label>Contract  Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={contractName}
          onChange={(e) => setcontractName(e.target.value)}
        />
      </label>
      <br/>
      <br/>
      <label>Enter  address:&nbsp;&nbsp;&nbsp;
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
