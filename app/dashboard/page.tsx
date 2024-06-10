'use client'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ChangeEvent, useContext, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import {
  ILinks,
  RefreshUserContext,
  SetUserContext,
  UserContext,
} from '../providers/UserProvider'
import { IResponse } from '../types/IResponse'

export default function Dashboard() {
  const [dates, setDates] = useState<{
    initialDate: string
    finalDate: string
  }>({ initialDate: '', finalDate: '' })
  const user = useContext(UserContext)
  const { refreshUser, setRefreshUser } = useContext(RefreshUserContext)
  const setUser = useContext(SetUserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  const deleteLink = async (linkId: string) => {
    const res = await fetch('/api/link', {
      body: JSON.stringify({ linkId }),
      method: 'DELETE',
    })
    const json = await res.json()
    alert(`${json.message}`)
    setRefreshUser(!refreshUser)
  }

  const getLinks = async () => {
    const { initialDate, finalDate } = dates
    const params = `?userId=${user?.id}&initialDate=${initialDate}&finalDate=${finalDate}`
    const res = await fetch('/api/link' + params)
    return await res.json()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDates({ ...dates, [e.target.name]: e.target.value })
  }

  const updateClicks = async () => {
    const { data: links }: IResponse<ILinks[]> = await getLinks()

    if (user && links) {
      setUser({ ...user, links })
    }
  }
  return (
    <>
      {user && (
        <Container
          mt="2rem"
          bgColor="HighlightTexts"
          rounded="1rem"
          padding="1rem"
        >
          <Text fontSize="1.5rem" textAlign="center">
            Dashboard
          </Text>
          <Flex justifyContent="space-between" mt="1rem" alignItems="flex-end">
            <Box mr=".5rem">
              <label htmlFor="initialDate">De:</label>
              <Input
                onChange={handleChange}
                placeholder="Delecione a data inicial"
                size="md"
                type="datetime-local"
                id="initialDate"
                name="initialDate"
              />
            </Box>
            <Box ml=".5rem">
              <label htmlFor="initialDate">Até:</label>
              <Input
                onChange={handleChange}
                placeholder="Delecione a data final"
                size="md"
                type="datetime-local"
                id="finalDate"
                name="finalDate"
              />
            </Box>
            <Button onClick={updateClicks} ml="1rem">
              Ok
            </Button>
          </Flex>
          <TableContainer width="100%" marginTop="2rem">
            <Table variant="simple" fontSize=".8rem">
              <Thead>
                <Tr>
                  <Th>Link</Th>
                  <Th>Destino</Th>
                  <Th isNumeric>Cliques</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user?.links.map((link) => {
                  return (
                    <>
                      <Tr key={link.id}>
                        <Td>
                          <a
                            href={`http://${window.location.host}/${link.slug}`}
                          >
                            http://{window.location.host}/{link.slug}
                          </a>
                        </Td>
                        <Td>
                          <a href={link.redirectTo}>{link.redirectTo}</a>
                        </Td>
                        <Td isNumeric>{link._count.clicks}</Td>
                        <Td isNumeric>
                          <FaTrash
                            className="hover:cursor-pointer hover:fill-red-600"
                            onClick={onOpen}
                          />
                        </Td>
                      </Tr>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Excluir Link
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Tem certeza que deseja excluir este link? Esta
                              ação não poderá ser desfeita.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  deleteLink(link.id)
                                }}
                                ml={3}
                              >
                                Excluir
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </>
                  )
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize="medium">TOTAL</Th>
                  <Th></Th>
                  <Th fontSize="medium" isNumeric>
                    {user?.links.reduce(
                      (acc, actual) => acc + actual._count.clicks,
                      0
                    )}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  )
}
