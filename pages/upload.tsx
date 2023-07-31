import { NextPage } from 'next'
import { Text, Flex, Box } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useStorageUpload } from "@thirdweb-dev/react"
import { useState } from "react"
import React from 'react'

const Home: NextPage = () => {
	const [file, setFile] = useState<File | null>(null)

	const { mutateAsync: upload } = useStorageUpload()

	const uploadToIpfs = async () => {
		const uploadUrl = await upload({
			data: [file],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true,
			},
		})

		alert("Uploaded to IPFS: " + uploadUrl)
	}

	return (
		<div>
			<input
				type="file"
				onChange={(e) => {
					if (e.target.files) {
						setFile(e.target.files[0])
					}
				}}
			/>
			<button onClick={uploadToIpfs}>Upload</button>
		</div>
	)
}

export default Home
