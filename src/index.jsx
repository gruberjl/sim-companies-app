import { render } from 'preact'
import { useState } from 'preact/hooks'
import Header from './components/header'
import './style.css'
import './pure-min.css'

function Term({term, setTerm}) {
	const setThePrice = (product) => (e) => {
		term[product].price = e.currentTarget.value
		setTerm(term)
	}

	const setQuantity = (product) => (e) => {
		term[product].quantity = e.currentTarget.value
		setTerm(term)
	}

	const setWages = (e) => {
		term.wages = e.currentTarget.value
		setTerm(term)
	}

	const setQualityBonus = (e) => {
		term.qualityBonus = e.currentTarget.value
		setTerm(term)
	}

	const deleteTerm = () => {
		setTerm(null)
	}

	return (
		<div className="pure-form">
			<fieldset>
				<input value={term.wages} onInput={setWages} placeholder="Wages" type="number"/>
				<input value={term.qualityBonus} onInput={setQualityBonus} placeholder="Quality Bonus %" type="number"/>
				<button className="button-delete pure-button" onClick={deleteTerm}>X</button>
			</fieldset>
			<fieldset>
				<img src="/sor.png" height="40" width="40" alt="Sub-orbital rocket" className="align-middle"/>
				<input value={term.sor.price} onInput={setThePrice('sor')} placeholder="$" type="number"/>
				<input value={term.sor.quantity} onInput={setQuantity('sor')} placeholder="# Quantity" type="number"/>
			</fieldset>
			<fieldset>
				<img src="/bfr.png" height="40" width="40" alt="BFR" className="align-middle"/>
				<input value={term.bfr.price} onInput={setThePrice('bfr')} placeholder="$" type="number"/>
				<input value={term.bfr.quantity} onInput={setQuantity('bfr')} placeholder="# Quantity" type="number"/>
			</fieldset>
			<fieldset>
				<img src="/jumbo.png" height="40" width="40" alt="Jumbo jet" className="align-middle"/>
				<input value={term.jumbo.price} onInput={setThePrice('jumbo')} placeholder="$" type="number"/>
				<input value={term.jumbo.quantity} onInput={setQuantity('jumbo')} placeholder="# Quantity" type="number"/>
			</fieldset>
			<fieldset>
				<img src="/lux.png" height="40" width="40" alt="Luxury jet" className="align-middle"/>
				<input value={term.lux.price} onInput={setThePrice('lux')} placeholder="$" type="number"/>
				<input value={term.lux.quantity} onInput={setQuantity('lux')} placeholder="# Quantity" type="number"/>
			</fieldset>
			<fieldset>
				<img src="/sep.png" height="40" width="40" alt="Single Engine Plane" className="align-middle"/>
				<input value={term.sep.price} onInput={setThePrice('sep')} placeholder="$" type="number"/>
				<input value={term.sep.quantity} onInput={setQuantity('sep')} placeholder="# Quantity" type="number"/>
			</fieldset>
			<fieldset>
				<img src="/sat.png" height="40" width="40" alt="Satellite" className="align-middle"/>
				<input value={term.sat.price} onInput={setThePrice('sat')} placeholder="$" type="number"/>
				<input value={term.sat.quantity} onInput={setQuantity('sat')} placeholder="# Quantity" type="number"/>
			</fieldset>
		</div>
	);
}

function Contract({contract, setContract}) {
	const setProduct = (e) => {
		contract.product = e.currentTarget.value
		setContract(contract)
	}

	const setPrice = (e) => {
		contract.price = e.currentTarget.value
		setContract(contract)
	}

	const setQuality = (e) => {
		contract.quality = e.currentTarget.value
		setContract(contract)
	}

	const deleteContract = () => {
		setContract(null)
	}

	return (
		<div className="pure-form">
			<fieldset>
				{ contract.product == 'sep' ? <img src="/sep.png" height="40" width="40" alt="Single Engine Plane" className="align-middle"/> : undefined }
				{ contract.product == 'sat' ? <img src="/sat.png" height="40" width="40" alt="Satellite" className="align-middle"/> : undefined }
				{ contract.product == 'lux' ? <img src="/lux.png" height="40" width="40" alt="Luxury jet" className="align-middle"/> : undefined }
				{ contract.product == 'jumbo' ? <img src="/jumbo.png" height="40" width="40" alt="Jumbo jet" className="align-middle"/> : undefined }
				{ contract.product == 'bfr' ? <img src="/bfr.png" height="40" width="40" alt="BFR" className="align-middle"/> : undefined }
				{ contract.product == 'sor' ? <img src="/sor.png" height="40" width="40" alt="Sub-orbital rocket" className="align-middle"/> : undefined }
				{ contract.product == '' ? <div className="box40"/> : undefined }
				
				<select name="product" value={contract.product} onChange={setProduct} placeholder="Product">
					<option value="sep">Single Engine Plane</option>
					<option value="sat">Satellite</option>
					<option value="lux">Luxury jet</option>
					<option value="jumbo">Jumbo jet</option>
					<option value="bfr">BFR</option>
					<option value="sor">Sub-orbital rocket</option>
				</select>
				<input value={contract.price} onInput={setPrice} placeholder="Price ($)" type="number"/>
				<input value={contract.quality} onInput={setQuality} placeholder="Quality" type="number"/>
				<span>{contract.highestProfit || 'profit'}</span>
				<button className="button-delete pure-button" onClick={deleteContract}>X</button>
			</fieldset>
		</div>
	)
}

export function App() {
	const [terms, setTerms] = useState([])
	const [contracts, setContracts] = useState([])

	const setTerm = (idx) => (term) => {
		const newTerms = [...terms]

		if (term == null) {
			newTerms.splice(idx, 1)
		} else {
			newTerms[idx] = term
		}
		
		const newContracts = contracts.map(contract => {
			calculateProfitForContract(contract, newTerms)
			return contract
		})
		setContracts(newContracts)
		setTerms(newTerms)
	}

	const calculateProfitForContract = (contract, newTerms) => {
		contract.highestProfit = undefined
		if (contract.product && contract.quality && contract.price) {
			newTerms.forEach(term => {
				if (term[contract.product].price && term.qualityBonus) {
					const price = Number(term[contract.product].price)
					const qualityBonus = (term.qualityBonus/100)*price*contract.quality
					const contractPrice = contract.price
					const profit = price+qualityBonus-contractPrice
					if (contract.highestProfit === undefined || profit > contract.highestProfit)
						contract.highestProfit = profit
				}
			})
		}
	}

	const setContract = idx => (contract) => {
		const newContracts = [...contracts]
		if (contract == null) {
			newContracts.splice(idx, 1)
			setContracts(newContracts)
		} else {
			calculateProfitForContract(contract, terms)
			newContracts[idx] = contract
			setContracts(newContracts)
		}

	}

	const addTerm = () => {
		const newTerms = [...terms]
		newTerms.push({
			qualityBonus: undefined,
			wages: undefined,
			sep: {price: '', quantity: ''},
			sat: {price: '', quantity: ''},
			lux: {price: '', quantity: ''},
			jumbo: {price: '', quantity: ''},
			bfr: {price: '', quantity: ''},
			sor: {price: '', quantity: ''},
		})

		setTerms(newTerms)
	}

	const addContract = () => {
		const newContracts = [...contracts]
		newContracts.push({
			product: '',
			quality: undefined,
			price: undefined,
			highestProfit: undefined
		})

		setContracts(newContracts)
	}

	return (
		<div>
			<Header currentPage={'/'}/>
			<main>
				<h1>Sim Companies Sales Office calculator</h1>
				<section>
					{ terms.map((term, idx) => (
						<Term term={term} setTerm={setTerm(idx)} key={idx}/>
					))}
					<button className="pure-button pure-button-primary" onClick={addTerm}>Add Term</button>
				</section>
				<section>
					{ contracts.map((contract, idx) => (
						<Contract contract={contract} setContract={setContract(idx)} key={idx}/>
					))}
					<button className="pure-button pure-button-primary" onClick={addContract}>Add Contract</button>
				</section>
			</main>
		</div>
	);
}

render(<App />, document.getElementById('app'));
