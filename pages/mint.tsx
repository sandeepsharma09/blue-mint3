import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { SetStateAction, useCallback, useEffect, useState } from "react";
import * as React from "react";
import { useAccount } from "wagmi";
import { ConnectWallet, useAddress, useSDK , useContract , useContractRead,useContractWrite  } from "@thirdweb-dev/react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from 'react-dropzone'

// import "./styles/Home.css";

const IndexPage: NextPage = () => {
//    const [name, setName] = useState('');
//    React.useEffect(() => {
//     // window is accessible here.
//     const search = window.location.search;
// const params = new URLSearchParams(search);
// const foo = params.get('contract');
// console.log(foo);
// setName(foo);
//   }, []);
     

 const contractaddress = '0xc6Adc341f0e2693803021DFc6744DcCe6cab7dab';
   const [contractName, setcontractName] = useState(contractaddress);
//  const [image, setImage] = useState(null);
  // const [percent, setPercent] = useState('');
const [image, setImage] = useState<any | null>(null);
const [percent, setPercent] = useState<any | null>(null);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
    // const { createCollection, isCreating, setIsCreating, getNFTs } =
    // useDataContext();

// console.log('image',image);
    
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");

  const [newmain, setNewmain] = useState(0);
    /////////////////////////////////////start////////////
    // const router = useRouter();
    const { address } = useAccount();
  const sdk = useSDK();
// "0x22bf39DB3AddE6DB848B20BEE9798009Da03820E"
    const { contract } = useContract(contractName);

console.log('contract', contract);

  const onDrop = useCallback((acceptedFiles: any) => {
    handleDrop(acceptedFiles);
  }, []);

  // const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({
  //   onDrop,
  //   accept: { "image/*": [] },
  //   maxFiles: 1,
  // });


  const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });


    const handleDrop = (acceptedFiles: Blob[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const imageUri = reader.result;
      setImage(imageUri);

      setPercent(imageUri);
      // console.log('imageUri',imageUri);
    };
  };



// =======================

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




  
// Address of the wallet you want to mint the NFT to
const walletAddress = "0x1A409E1473C6a92E45DbF7363C1532D5D3A1a3dF";

// Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
// const metadata = {
//   name: "Cool NFT",
//   description: "This is a cool NFT",
//   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
// };

// const tx = await contract.erc721.mintTo(walletAddress, metadata);
// const receipt = tx.receipt; // the transaction receipt
// const tokenId = tx.id; // the id of the NFT minted
// const nft = await tx.data(); // (optional) fetch details of minted NFT
// console.log('nft',nft);

/////////////////////////////

const handleSubmit = async (event: { preventDefault: () => void }) => {
    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(contractName);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    
    // let num = Number(percent) * 100;
    // num = Number(num);
    //  console.log('number',num);
   
      console.log('newmain',newmain);
   
call();
console.log('working');






  }


  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setMyCar(event.target.value)
  }

  const handleChange1 = () => {
    console.log('newmoon');
    // setNewmain(percent*100);
  }

/////////////////////////////



  return (
    <Layout>
      <Flex
        direction="column"
        align="center"
        css={{ py: '200px', px: '$3', textAlign: 'center' }}
      >
        
      <form onSubmit={handleSubmit}>
                {/* <label className="d-none">Contract Type: &nbsp;
        <select  onChange={handleChange} className="form-control">
        <option value="nft-collection">721 </option>
        <option value="edition">1155</option>
      </select> 
      </label> */}
      <br></br>
      <br></br>
   
      {/* <label>Contract  name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label> */}
      <br></br>
      <br></br>

       {/* <label className="d-none">Enter  Symbol:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label> */}
      {/* <br></br>
      <br></br> */}
      <label>Enter  address:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      {/* <br></br>
      <br></br>
      <label>Enter  url:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={percent}
           onChange={e => { setPercent(e.target.value) }}

        />
      </label> */}
      <br></br>
      <br></br>
      <br></br>
  

      {/* <input onClick={handleChange1} type="submit" value={'Deploy'}  /> */}
 


               <div className="input-group">
                <label htmlFor="image">Media</label>
                <div>
                  <div
                    
                   
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {image ? (
                      <img src={image} alt="NFT Image" />
                    ) : (
                      <>
                        <AiOutlineCloudUpload  />
                        <p>Upload Image</p>
                      </>
                    )}
                  </div>
                  <button onClick={open}>Select File</button>
                </div>
              </div>
 <br></br>
      <br></br>
      <br></br>

                     <Button onClick={handleChange1} type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Mint Now
              </Button>

    </form>
      </Flex>
    </Layout>
  )
}

export default IndexPage

// function getRootProps(): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> {
//   throw new Error('Function not implemented.')
// }

// function getInputProps(): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> {
//   throw new Error('Function not implemented.')
// }
// function useDataContext(): { createCollection: any; isCreating: any; setIsCreating: any; getNFTs: any } {
//   throw new Error('Function not implemented.')
// }

// function useDropzone(arg0: { onDrop: (acceptedFiles: any) => void; accept: { "image/*": never[] }; maxFiles: number }): { getRootProps: any; getInputProps: any; isDragAccept: any; open: any } {
//   throw new Error('Function not implemented.')
// }

