import { render } from 'preact'
import { useState } from 'preact/hooks'
import Header from './components/header'
import resources from './components/resources.json'
import './style.css'
import './pure-min.css'

const buildingNames = {"E": "Power plant", "W": "Water reservoir", "P": "Farm", "i": "Mill", "F": "Ranch", "e": "Slaughterhouse", "O": "Oil rig", "6": "Beverage factory", "R": "Refinery", "S": "Shipping depot", "M": "Mine", "Q": "Quarry", "Y": "Factory", "L": "Electronics factory", "p": "Plant research center", "h": "Physics laboratory", "b": "Breeding laboratory", "c": "Chemistry laboratory", "s": "Software R&D", "T": "Fashion factory", "D": "Propulsion factory", "1": "Car factory", "a": "Automotive R&D", "f": "Fashion & design", "7": "Aerospace factory", "8": "Aerospace electronics", "9": "Vertical integration facility", "0": "Hangar", "l": "Launch pad", "o": "Concrete plant", "x": "Construction factory", "g": "General contractor", "k": "Food processing plant", "j": "Bakery", "m": "Catering", "q": "Kitchen"}

const addResource = (resource, producedFromResourceName, amount) => {
  if (!resource.requiredResources[producedFromResourceName])
    resource.requiredResources[producedFromResourceName] = 0

  resource.requiredResources[producedFromResourceName] += amount
}

const getRequiredResources = (resources, resource) => {
  resource.requiredResources = {}
  resource.directRequiredResources = {}

  resource.producedFrom.forEach(producedFrom => {
    const producedFromResource = resources.find(r => r.db_letter == producedFrom.resource.db_letter)
    addResource(resource, producedFromResource.name, producedFrom.amount)
    resource.directRequiredResources[producedFromResource.name] = producedFrom.amount
    Object.keys(producedFromResource.requiredResources).forEach(resourceName => {
      const amount = producedFromResource.requiredResources[resourceName]*1000 * producedFrom.amount*1000/1000000
      addResource(resource, resourceName, amount)
    })
  })
}

const addRequiredBuildingLevel = (resource, building, levelRequired) => {
  if (!resource.requiredBuildingLevels[building])
    resource.requiredBuildingLevels[building] = 0

  resource.requiredBuildingLevels[building] += levelRequired
}

const getRequiredBuildingLevels = (resources, resource) => {
  resource.requiredBuildingLevels = {}
  resource.directRequiredBuildingLevels = {}

  Object.keys(resource.directRequiredResources).forEach(resourceName => {
    const requiredResource = resources.find(r => r.name == resourceName)
    resource.directRequiredBuildingLevels[requiredResource.producedAt] = (resource.producedAnHour*24*resource.requiredResources[resourceName]/requiredResource.producedAnHour)/24
  })

  Object.keys(resource.requiredResources).forEach(resourceName => {
    const requiredResource = resources.find(r => r.name == resourceName)
    addRequiredBuildingLevel(resource, requiredResource.producedAt, (resource.producedAnHour*24*resource.requiredResources[resourceName]/requiredResource.producedAnHour)/24)
    
  })
}

const RequiredResources = ({currentResource, buildingLevel, showNested}) => {
  const requiredResources = showNested ? currentResource.requiredResources : currentResource.directRequiredResources
  return (
    <table class="pure-table">
      <thead>
        <tr>
          <th>Resource name</th>
          <th>Required per unit</th>
          <th>Required per day</th>
        </tr>
      </thead>
      <tbody>
        { Object.keys(requiredResources).map(resourceName => (
          <tr>
              <td>{resourceName}</td>
              <td>{requiredResources[resourceName]}</td>
              <td>{requiredResources[resourceName]*currentResource.producedAnHour*24*(buildingLevel || 1)}</td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}

const RequiredBuildings = ({currentResource, buildingLevel, showNested}) => {
  const buildingLevels = showNested ? currentResource.requiredBuildingLevels : currentResource.directRequiredBuildingLevels
  return (
  <table class="pure-table">
    <thead>
      <tr>
        <th>Building name</th>
        <th>Level required</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(buildingLevels).map(buildingKey => (
        <tr>
          <td>{buildingNames[buildingKey]}</td>
          <td>{buildingLevels[buildingKey] * (buildingLevel || 1)}</td>
        </tr>
      )) }
    </tbody>
  </table>
)}

const RequiredToBuild = () => {
  const [currentResource, setTheCurrentResource] = useState({name: '', requiredResources: {}, requiredBuildingLevels:{}})
  const [buildingLevel, setBuildingLevel] = useState()
  const [isNested, setNested] = useState(true)
  const sortOrder = ['Power','Water','Seeds','Apples','Oranges','Grapes','Grain','Vegetables','Fodder','Cows','Steak','Pigs','Sausages','Eggs','Crude oil','Sugarcane','Ethanol','Petrol','Diesel','Transport','Minerals','Bauxite','Sand','Silicon','Chemicals','Aluminium','Plastic','Processors','Electronic components','Batteries','Displays','Smart phones','Tablets','Laptops','Monitors','Televisions','Plant research','Energy research','Mining research','Electronics research','Breeding research','Chemistry research','Software','Cotton','Fabric','Iron ore','Steel','Glass','Leather','On-board computer','Electric motor','Luxury car interior','Basic interior','Car body','Combustion engine','Economy e-car','Luxury e-car','Economy car','Luxury car','Truck','Automotive research','Fashion research','Underwear','Gloves','Dress','Stiletto Heel','Handbags','Sneakers','Xmas crackers','Gold ore','Golden bars','Luxury watch','Necklace','Methane','Carbon fibers','Carbon composite','Fuselage','Wing','High grade e-comps','Flight computer','Cockpit','Attitude control','Rocket fuel','Propellant tank','Solid fuel booster','Rocket engine','Heat shield','Ion drive','Jet engine','Sub-orbital 2nd stage','Sub-orbital rocket','Orbital booster','Starship','BFR','Jumbo jet','Luxury jet','Single engine plane','Quadcopter','Satellite','Aerospace research','Limestone','Cement','Reinforced concrete','Clay','Bricks','Wood','Steel beams','Planks','Windows','Tools','Bulldozer','Construction units','Materials research','Robots','Milk','Coffee beans','Coffee powder','Flour','Butter','Dough','Bread','Cheese','Sugar','Apple pie','Orange juice','Apple cider','Ginger beer','Frozen pizza','Pasta','Vegetable oil','Hamburger','Sauce','Lasagna','Meat balls','Cocktails','Cocoa','Chocolate','Salad','Samosa','Xmas ornament','Recipes']
  resources.sort((a,b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name))
  resources.forEach(resource => getRequiredResources(resources, resource))
  resources.forEach(resource => getRequiredBuildingLevels(resources, resource))

  const setCurrentResource = (e) => {
    const resource = resources.find(r => r.name == e.currentTarget.value)
    if (resource)
      setTheCurrentResource(resource)
  }

  return (
    <div>
      <Header currentPage={'/required-to-build.html'}/>
      <main>
        <div className="pure-form">
          <datalist id="resources">
            {Object.values(resources).map(resource =>
              <option>{resource.name}</option>
            )}
          </datalist>
          <input type="text" list="resources" value={currentResource.name} onInput={setCurrentResource} placeholder="Resource"/>
          <input type="number" value={buildingLevel} onInput={(e) => setBuildingLevel(e.currentTarget.value)} placeholder="Building level" />
          <label for="is-nested">
            <input id="is-nested" type="checkbox" checked={isNested} onClick={() => setNested(!isNested)}/> Show nested resources
          </label>
        </div>
        <h1>{currentResource.name}</h1>
        {currentResource.name ? <h2>Required resources</h2> : undefined}
        {currentResource.name ? <RequiredResources currentResource={currentResource} buildingLevel={buildingLevel} showNested={isNested}/> : undefined}
        {currentResource.name ? <h2>Required buildings</h2> : undefined}
        {currentResource.name ? <RequiredBuildings currentResource={currentResource} buildingLevel={buildingLevel} showNested={isNested}/> : undefined}
      </main>
    </div>
  )
}

render(<RequiredToBuild />, document.getElementById('app'))