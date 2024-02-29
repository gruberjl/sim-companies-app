import { render } from 'preact'
import { useState } from 'preact/hooks'
import Header from './components/header'
import './style.css'
import './pure-min.css'

function Term({term, setTerm}) {
	const setThePrice = (product) => (e) => {
		term.price[product] = e.currentTarget.value
		setTerm(term)
	}

	const setQuantity = (product) => (e) => {
		term.quantity[product] = e.currentTarget.value
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

	return (
		<div>
			<Header currentPage={'/'}/>
			<div className="pure-form term-container">
				<div className="product-term">
					<input value={term.wages} onInput={setWages} placeholder="Wages" type="number" style={{height:'34px'}} className="margin6"/>
					<input value={term.qualityBonus} onInput={setQualityBonus} placeholder="Quality Bonus %" type="number" style={{height:'34px'}} className="margin6"/>
				</div>
				<div className="product-term">
					<img src="/public/SOR.png" height="40" width="40" alt="Sub-orbital rocket" className="margin6"/>
					<input value={term.price.sor} onInput={setThePrice('sor')} placeholder="$" type="number" className="margin6"/>
					<input value={term.quantity.sor} onInput={setQuantity('sor')} placeholder="# Quantity" type="number" className="margin6"/>
				</div>
				<div className="product-term">
					<img src="/public/BFR.png" height="40" width="40" alt="BFR" className="margin6"/>
					<input value={term.price.bfr} onInput={setThePrice('bfr')} placeholder="$" type="number" className="margin6"/>
					<input value={term.quantity.bfr} onInput={setQuantity('bfr')} placeholder="# Quantity" type="number" className="margin6"/>
				</div>
				<div className="product-term">
					<img src="/public/jumbo.png" height="40" width="40" alt="Jumbo jet" className="margin6"/>
					<input value={term.price.jumbo} onInput={setThePrice('jumbo')} placeholder="$" type="number" className="margin6"/>
					<input value={term.quantity.jumbo} onInput={setQuantity('jumbo')} placeholder="# Quantity" type="number" className="margin6"/>
				</div>
				<div className="product-term">
					<img src="/public/luxury.png" height="40" width="40" alt="Luxury jet" className="margin6"/>
					<input value={term.price.lux} onInput={setThePrice('lux')} placeholder="$" type="number" className="margin6"/>
					<input value={term.quantity.lux} onInput={setQuantity('lux')} placeholder="# Quantity" type="number" className="margin6"/>
				</div>
				<div className="product-term">
					<img src="/public/sep.png" height="40" width="40" alt="Single Engine Plane" className="margin6"/>
					<input value={term.price.sep} onInput={setThePrice('sep')} placeholder="$" type="number" className="margin6"/>
					<input value={term.quantity.sep} onInput={setQuantity('sep')} placeholder="# Quantity" style={{height:'34px'}} type="number" className="margin6"/>
				</div>
				<div className="product-term">
					<img src="/public/satellite.png" height="40" width="40" alt="Satellite" className="margin6"/>
					<input value={term.price.sat} onInput={setThePrice('sat')} placeholder="$" type="number" className="margin6"/>
					<input value={term.quantity.sat} onInput={setQuantity('sat')} placeholder="# Quantity" type="number" className="margin6"/>
				</div>
			</div>
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

	return (<div>
		<div className="flex margin6-0" style={{height:'40px'}}>
			{ contract.product == 'sep' ? <img src="/public/sep.png" height="40" width="40" alt="Single Engine Plane"/> : undefined }
			{ contract.product == '' ? <div style={{width:'40px'}}/> : undefined }
			
			<select name="product" value={contract.product} onChange={setProduct} placeholder="Product">
  			<option value="sep">Single Engine Plane</option>
			</select>
			<div className="margin0-6">
				<input value={contract.price} onInput={setPrice} placeholder="Price ($)" style={{height:'34px'}} type="number"/>
			</div>
			<div className="margin0-6">
				<input value={contract.quality} onInput={setQuality} placeholder="Quality" style={{height:'34px'}} type="number"/>
			</div>
			<div>
				<div>{contract.highestProfit}</div>
				<div>{}</div>
			</div>
		</div>
	</div>)
}

export function App() {
	const [terms, setTerms] = useState([])
	const [contracts, setContracts] = useState([])

	const setTerm = (idx) => (term) => {
		const newTerms = [...terms]
		newTerms[idx] = term
		setTerms(newTerms)
	}

	const calculateProfitForContract = (contract) => {
		contract.highestProfit = undefined

		if (contract.product && contract.quality && contract.price) {
			terms.forEach(term => {
				if (term.quantity[contract.product] && term.price[contract.product] && term.qualityBonus) {
					const price = Number(term.price[contract.product])
					const qualityBonus = (term.qualityBonus/100)*price*contract.quality
					const contractPrice = contract.price
					const profit = price+qualityBonus-contractPrice
					console.log(typeof price)
					console.log(typeof qualityBonus)
					console.log(typeof contractPrice)
					console.log(typeof profit)
					if (contract.highestProfit === undefined || profit > contract.highestProfit)
						contract.highestProfit = profit
				}
			})
		}
	}

	const setContract = idx => (contract) => {
		calculateProfitForContract(contract)
		const newContracts = [...contracts]
		newContracts[idx] = contract
		setContracts(newContracts)
	}

	const addTerm = () => {
		const newTerms = [...terms]
		newTerms.push({
			qualityBonus: undefined,
			wages: undefined,
			quantity: {
				sep: '',
				sat: '',
				lux: '',
				jumbo: '',
				bfr: '',
				sor: '',
			},
			price: {
				sep: '',
				sat: '',
				lux: '',
				jumbo: '',
				bfr: '',
				sor: '',
			}
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
		<main className="margin6">
			<h1>Sim Companies Sales Office calculator</h1>
			<section>
				{ terms.map((term, idx) => (
					<Term term={term} setTerm={setTerm(idx)} key={idx}/>
				))}
				<button onClick={addTerm}>Add Term</button>
			</section>
			<section>
				{ contracts.map((contract, idx) => (
					<Contract contract={contract} setContract={setContract(idx)} key={idx}/>
				))}
				<button onClick={addContract}>Add Contract</button>
			</section>
		</main>
	);
}

render(<App />, document.getElementById('app'));
