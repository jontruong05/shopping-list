'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material'
import {collection, doc, getDocs, query, setDoc, deleteDoc, getDoc} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(true)
  const [itemName, setItemName] = useState([''])

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()  
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }
  

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={5}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What item would you like to add?
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="e.g. apple, banana, kiwi"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box border={'1px solid #333'}>
        <Box
          width="1600px"
          height="100px"
          bgcolor={'#FFFF00'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Shopping List
          </Typography>
        </Box>
        <Box
          width="1600px"
          height="100px"
          bgcolor={'#f0f0f0'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingX={5}
        >
          <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
            Item
          </Typography>
          <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
            Quantity
          </Typography>
          <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
            Remove Item?
          </Typography>
        </Box>
        <Stack width="1600px" height="1000px" spacing={2} overflow={'auto'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {quantity}
                <Button variant="increment" onClick={() => addItem(name)}>
                  +
                </Button>
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
    </Box>
  )
}