'use client'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import { RefreshUserContext, UserContext } from '../providers/UserProvider'

export default function Dashboard() {
  const user = useContext(UserContext)
  const { refreshUser, setRefreshUser } = useContext(RefreshUserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const deleteLink = async (linkId: string) => {
    const res = await fetch('/api/link', {
      body: JSON.stringify({ linkId }),
      method: 'DELETE',
    })
    const json = await res.json()
    alert(`${json.message}`)
    setRefreshUser(!refreshUser)
  }
  return (
    <>
      {user && (
        <TableContainer width="100%" marginTop="2rem">
          <Table variant="simple">
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
                        <a href={`http://${window.location.host}/${link.slug}`}>
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
                            Tem certeza que deseja excluir este link? Esta ação
                            não poderá ser desfeita.
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
      )}
    </>
  )
}
