import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../auth/style.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontext'
import { FaUser, FaLock } from 'react-icons/fa';
import { Box, Button, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){
  const navigate=useNavigate()
  const [username,setUsername] =useState("")
  const [password,setPassword] =useState("")
  const handlesubmit=async(event)=>{
      event.preventDefault();
      const postData = {
        username: username,
        password: password
      };
      axios.post("https://e-commerce-backend-l0au.onrender.com/user/register",postData)
      .then(response=>{
        if(response.data==="User already existes")
        {
          toast.error(response.data)
        }
        else
        {
          toast.success(response.data,{
            onClose:navigate('/')
          })
        }
      })
      .catch(error=>{
        toast.error('Error !!!')
      })
      setUsername("")
      setPassword("")
      
  }
return (
  <Box w={'30%'} mx={'auto'} mt={'25vh'} boxShadow={'lg'}>
      <Heading mb={4} p={4}>Register</Heading>
      <VStack gap={4}>
          <HStack >
          <FaUser style={{marginRight:'10px'}}/>
          <Input type='text' value={username} onChange={(event)=>setUsername(event.target.value)} id='username'/>
          </HStack>
          <HStack>
          <FaLock style={{marginRight:'10px'}}/>
          <Input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} id='password'/>
          </HStack>
          <Button colorScheme='blue' type='submit' onClick={handlesubmit} mb={4}>Submit</Button>
      </VStack>
      <ToastContainer/>
  </Box>
)
}

export default Register
