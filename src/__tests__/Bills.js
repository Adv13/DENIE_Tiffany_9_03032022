/**
 * @jest-environment jsdom
 */
import'@testing-library/jest-dom'
import {screen, waitFor, fireEvent} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import {ROUTES, ROUTES_PATH} from "../constants/routes.js";
import store from "../__mocks__/store.js"
import Router from "../app/Router.js";
import Bills from '../containers/Bills.js';

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      //to-do write expect expression done
      window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))// défini le user en tant qu'employé dans le local storage
      Object.defineProperty(window, "location", { value: { hash: ROUTES_PATH['Bills'] } });// défini l'url comme étant '#employee/bills'
      document.body.innerHTML = `<div id="root"></div>` // créé le noeud pour que le router injecte l'objet correspondant à l'url
      Router();// lance le router
      const checkClass = screen.getByTestId("icon-window").classList.contains("active-icon");
      expect(checkClass).toBeTruthy(); // vérifie si l'icone est la

    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
})
describe('Given i am on the loading page',()=>{
  test('Should show Loading...',()=>{
    const html = BillsUI({loading : true})
    document.body.innerHTML = html
    expect(screen.getAllByText('Loading...')).toBeTruthy()


  })
})

describe('Given i am on error page', () => {
  test('should show the error message',()=>{
    const html = BillsUI({error : 'error message'})
    document.body.innerHTML = html
    expect(screen.getAllByText('error message')).toBeTruthy()
  })
})

//Bill tests

describe('Given I am on bills page',()=>{
    //methode handleClickNewBill
    test('Should called the handleClickNewBill method when i click on newBill button',()=>{  
      window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      let pathname =  ROUTES_PATH['Bills']
      const onNavigate = ((pathname) => document.body.innerHTML = ROUTES({ pathname }))
      const bill= new Bills({
        document,
        onNavigate       
      })    
      const handleClickNewBill = jest.fn(bill.handleClickNewBill)
      const buttonNewBill = screen.getByTestId('btn-new-bill')
      expect(buttonNewBill).toBeTruthy()
      buttonNewBill.addEventListener('click', handleClickNewBill)
      fireEvent.click(buttonNewBill)
      expect(handleClickNewBill).toHaveBeenCalled()
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
    })

    //methode handleClickIconEye
    test('Should called the handleClickIconEye when I click on iconEye',()=>{    
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      let pathname = ROUTES_PATH['Bills']
      const bill= new Bills({
        document,
        onNavigate: (pathname) => document.body.innerHTML = ROUTES({ pathname })
      })  
      const allIconEye = screen.getAllByTestId('icon-eye')
      expect(allIconEye).toBeTruthy()
      const iconEye1 = allIconEye[0]
      const handleClickIconEye = jest.fn(bill.handleClickIconEye(iconEye1))
      iconEye1.addEventListener('click', handleClickIconEye)
      expect(iconEye1).toBeTruthy()       
      fireEvent.click(iconEye1)
      expect(handleClickIconEye).toHaveBeenCalled()
      const modale = document.getElementById('modaleFile')
      expect(modale).toBeTruthy()
      expect(modale).toHaveTextContent('Justificatif')
      //test pour savoir si la modale s'ouvre quand on clique sur un oeil  
    })
})

// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to BillUI", () => {
    test("fetches bills from mock API GET", async () => {
       const getSpy = jest.spyOn(store, "get") // fonction simulée qui surveille l'appel de la méthode get de l'objet store mocké
       const bills = await store.get() //récupère les données du store mocké
       expect(getSpy).toHaveBeenCalledTimes(1) //sore.get a été appelé 1 fois
       expect(bills.data.length).toBe(4) // les données contiennent 4 objets
    })
    test("fetches bills from an API and fails with 404 message error", async () => {
      store.get.mockImplementationOnce(() => // simule un rejet de la promesse
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("fetches messages from an API and fails with 500 message error", async () => {
      store.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})
