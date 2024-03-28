import { render } from 'preact'
import { useState } from 'preact/hooks'
import Header from './components/header'
import './sales-office.css'
// import './pure-min.css'

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
		<form className="term">
			<fieldset>
				<input value={term.wages} onInput={setWages} placeholder="Wages" type="number"/>
				<input value={term.qualityBonus} onInput={setQualityBonus} placeholder="Bonus %" type="number"/>
				<button className="button-delete pure-button" onClick={deleteTerm}>X</button>
				<span className="term-profit">{term.profit || ''}</span>
			</fieldset>
			<fieldset>
				<img src="sor.png" height="40" width="40" alt="Sub-orbital rocket"/>
				<input value={term.sor.price} onInput={setThePrice('sor')} placeholder="$" type="number"/>
				<input value={term.sor.quantity} onInput={setQuantity('sor')} placeholder="Quantity" type="number"/>
				<span>
					<div>{term.sor.highestProfit ? term.sor.highestProfit : ''}</div>
					<div>{term.sor.profitProduct || ''}</div>
				</span>
			</fieldset>
			<fieldset>
				<img src="bfr.png" height="40" width="40" alt="BFR" className="align-middle"/>
				<input value={term.bfr.price} onInput={setThePrice('bfr')} placeholder="$" type="number"/>
				<input value={term.bfr.quantity} onInput={setQuantity('bfr')} placeholder="Quantity" type="number"/>
				<span>
					<div>{term.bfr.highestProfit ? term.bfr.highestProfit : ''}</div>
					<div>{term.bfr.profitProduct || ''}</div>
				</span>
			</fieldset>
			<fieldset>
				<img src="jumbo.png" height="40" width="40" alt="Jumbo jet" className="align-middle"/>
				<input value={term.jumbo.price} onInput={setThePrice('jumbo')} placeholder="$" type="number"/>
				<input value={term.jumbo.quantity} onInput={setQuantity('jumbo')} placeholder="Quantity" type="number"/>
				<span>
					<div>{term.jumbo.highestProfit ? term.jumbo.highestProfit : ''}</div>
					<div>{term.jumbo.profitProduct || ''}</div>
				</span>
			</fieldset>
			<fieldset>
				<img src="lux.png" height="40" width="40" alt="Luxury jet" className="align-middle"/>
				<input value={term.lux.price} onInput={setThePrice('lux')} placeholder="$" type="number"/>
				<input value={term.lux.quantity} onInput={setQuantity('lux')} placeholder="Quantity" type="number"/>
				<span>
					<div>{term.lux.highestProfit ? term.lux.highestProfit : ''}</div>
					<div>{term.lux.profitProduct || ''}</div>
				</span>
			</fieldset>
			<fieldset>
				<img src="sep.png" height="40" width="40" alt="Single Engine Plane" className="align-middle"/>
				<input value={term.sep.price} onInput={setThePrice('sep')} placeholder="$" type="number"/>
				<input value={term.sep.quantity} onInput={setQuantity('sep')} placeholder="Quantity" type="number"/>
				<span>
					<div>{term.sep.highestProfit ? term.sep.highestProfit : ''}</div>
					<div>{term.sep.profitProduct || ''}</div>
				</span>
			</fieldset>
			<fieldset>
				<img src="sat.png" height="40" width="40" alt="Satellite" className="align-middle"/>
				<input value={term.sat.price} onInput={setThePrice('sat')} placeholder="$" type="number"/>
				<input value={term.sat.quantity} onInput={setQuantity('sat')} placeholder="Quantity" type="number"/>
				<span>
					<div>{term.sat.highestProfit ? term.sat.highestProfit : ''}</div>
					<div></div>
				</span>
			</fieldset>
		</form>
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
		<div className="contract">
			<div className="contract-title">
				<div className="img-container">
					{ contract.product == 'sep' ? <img src="sep.png" height="40" width="40" alt="Single Engine Plane"/> : undefined }
					{ contract.product == 'sat' ? <img src="sat.png" height="40" width="40" alt="Satellite"/> : undefined }
					{ contract.product == 'lux' ? <img src="lux.png" height="40" width="40" alt="Luxury jet"/> : undefined }
					{ contract.product == 'jumbo' ? <img src="jumbo.png" height="40" width="40" alt="Jumbo jet"/> : undefined }
					{ contract.product == 'bfr' ? <img src="bfr.png" height="40" width="40" alt="BFR"/> : undefined }
					{ contract.product == 'sor' ? <img src="sor.png" height="40" width="40" alt="Sub-orbital rocket"/> : undefined }
				</div>
				
				<select name="product" value={contract.product} onChange={setProduct} placeholder="Product">
					<option value="sep">Single Engine Plane</option>
					<option value="sat">Satellite</option>
					<option value="lux">Luxury jet</option>
					<option value="jumbo">Jumbo jet</option>
					<option value="bfr">BFR</option>
					<option value="sor">Sub-orbital rocket</option>
				</select>
				<button className="button-delete" onClick={deleteContract}>X</button>
			</div>
			<div className="contract-body">
				<input class="price" value={contract.price} onInput={setPrice} placeholder="Price ($)" type="number"/>
				<input class="body" value={contract.quality} onInput={setQuality} placeholder="Quality" type="number"/>
				<span class="profit">{contract.highestProfit || 'profit'}</span>
			</div>
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
			calculateProfitForTerm(term, contracts)
			newTerms[idx] = term
		}
		
		const newContracts = contracts.map(contract => {
			calculateProfitForContract(contract, newTerms)
			return contract
		})
		
		setContracts(newContracts)
		setTerms(newTerms)
	}

	const calculateProfitForTerm = (term, contracts) => {
		term.profit = undefined
		term.sep.highestProfit = undefined
		term.sat.highestProfit = undefined
		term.lux.highestProfit = undefined
		term.jumbo.highestProfit = undefined
		term.bfr.highestProfit = undefined
		term.sor.highestProfit = undefined

		if (!term.qualityBonus)
			return

		contracts.forEach(contract => {
			if (term[contract.product].price && contract.quality) {
				const price = Number(term[contract.product].price)
				const qualityBonus = (term.qualityBonus/100)*price*contract.quality
				const contractPrice = contract.price
				const profit = price+qualityBonus-contractPrice
				if (term[contract.product].highestProfit === undefined || profit > term[contract.product].highestProfit)
					term[contract.product].highestProfit = profit
					term[contract.product].profitProduct = `Q${contract.quality}: ${contractPrice}`
				}
		})
		
		if (!term.wages)
			return
		if (term.sep.price && !term.sep.highestProfit)
			return

		let profit = -term.wages
		if (term.sep.highestProfit)
			profit = profit + term.sep.highestProfit
		if (term.sat.highestProfit)
			profit = profit + term.sat.highestProfit
		if (term.lux.highestProfit)
			profit = profit + term.lux.highestProfit
		if (term.jumbo.highestProfit)
			profit = profit + term.jumbo.highestProfit
		if (term.bfr.highestProfit)
			profit = profit + term.bfr.highestProfit
		if (term.sor.highestProfit)
			profit = profit + term.sor.highestProfit

		term.profit = profit
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
		}

		const newTerms = terms.map(term => {
			calculateProfitForTerm(term, newContracts)
			return term
		})
		setTerms(newTerms)

		setContracts(newContracts)
	}

	const addTerm = () => {
		const newTerms = [...terms]
		newTerms.push({
			qualityBonus: undefined,
			wages: undefined,
			profit: undefined,
			sep: {price: '', quantity: '', highestProfit: undefined, profitProduct: ''},
			sat: {price: '', quantity: '', highestProfit: undefined, profitProduct: ''},
			lux: {price: '', quantity: '', highestProfit: undefined, profitProduct: ''},
			jumbo: {price: '', quantity: '', highestProfit: undefined, profitProduct: ''},
			bfr: {price: '', quantity: '', highestProfit: undefined, profitProduct: ''},
			sor: {price: '', quantity: '', highestProfit: undefined, profitProduct: ''},
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

	let message = ``
	let sep = 0
	let lux = 0
	let jumbo = 0
	let sor = 0
	let sat = 0
	let bfr = 0
	terms.forEach(term => {
		sep += Number(term.sep.quantity)
		lux += Number(term.lux.quantity)
		jumbo += Number(term.jumbo.quantity)
		sor += Number(term.sor.quantity)
		sat += Number(term.sat.quantity)
		bfr += Number(term.bfr.quantity)
	})
	if (sor > 0) message = message + `${sor} :re-91: Sub-Orbital Rockets\n`
	if (bfr > 0) message = message + `${bfr} :re-94: BFRs\n`
	if (jumbo > 0) message = message + `${jumbo} :re-95: Jumbo Jets\n`
	if (lux > 0) message = message + `${lux} :re-96: Luxury Jets\n`
	if (sep > 0) message = message + `${sep} :re-97: Single Engine Planes\n`
	if (sat > 0) message = message + `${sat}:re-99: Satellites\n`
	if (message.length > 0) message = `✈️ :bd-B: BUYING :bd-B: ✈️\n` + message

	const copyToClipboard = () => {
		navigator.clipboard.writeText(message)
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
					{ message
						? (
							<div>
								<textarea value={message} />
								<button onClick={copyToClipboard} className="copy-to-clipboard">Copy to clipboard</button>
							</div>
						)
						: ''
					}

					<button className="btn-green" onClick={addTerm}>Add Term</button>
				</section>
				<section>
					{ contracts.map((contract, idx) => (
						<Contract contract={contract} setContract={setContract(idx)} key={idx}/>
					))}
					<button className="btn-green" onClick={addContract}>Add Contract</button>
				</section>
			</main>
		</div>
	);
}

render(<App />, document.getElementById('app'));
