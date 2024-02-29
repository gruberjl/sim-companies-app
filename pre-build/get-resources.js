import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const getResources = () => {
  const promises = []
  
  for (let i = 1; i <= 145; i++) {
    promises.push(
      fetch(`https://www.simcompanies.com/api/v4/en/0/encyclopedia/resources/1/${i}/`)
      .catch(e => fetch(`https://www.simcompanies.com/api/v4/en/0/encyclopedia/resources/1/${i}/`))
      .then(resource => resource.json())
    )
  }
  
  Promise.all(promises).then(resources => {
    // @ts-ignore
    const r = resources.filter(r => r.name)

    const sortOrder = ['Power','Water','Seeds','Apples','Oranges','Grapes','Grain','Vegetables','Fodder','Cows','Steak','Pigs','Sausages','Eggs','Crude oil','Sugarcane','Ethanol','Petrol','Diesel','Transport','Minerals','Bauxite','Sand','Silicon','Chemicals','Aluminium','Plastic','Processors','Electronic components','Batteries','Displays','Smart phones','Tablets','Laptops','Monitors','Televisions','Plant research','Energy research','Mining research','Electronics research','Breeding research','Chemistry research','Software','Cotton','Fabric','Iron ore','Steel','Glass','Leather','On-board computer','Electric motor','Luxury car interior','Basic interior','Car body','Combustion engine','Economy e-car','Luxury e-car','Economy car','Luxury car','Truck','Automotive research','Fashion research','Underwear','Gloves','Dress','Stiletto Heel','Handbags','Sneakers','Xmas crackers','Gold ore','Golden bars','Luxury watch','Necklace','Methane','Carbon fibers','Carbon composite','Fuselage','Wing','High grade e-comps','Flight computer','Cockpit','Attitude control','Rocket fuel','Propellant tank','Solid fuel booster','Rocket engine','Heat shield','Ion drive','Jet engine','Sub-orbital 2nd stage','Sub-orbital rocket','Orbital booster','Starship','BFR','Jumbo jet','Luxury jet','Single engine plane','Quadcopter','Satellite','Aerospace research','Limestone','Cement','Reinforced concrete','Clay','Bricks','Wood','Steel beams','Planks','Windows','Tools','Bulldozer','Construction units','Materials research','Robots','Milk','Coffee beans','Coffee powder','Flour','Butter','Dough','Bread','Cheese','Sugar','Apple pie','Orange juice','Apple cider','Ginger beer','Frozen pizza','Pasta','Vegetable oil','Hamburger','Sauce','Lasagna','Meat balls','Cocktails','Cocoa','Chocolate','Salad','Samosa','Xmas ornament','Recipes']
    // @ts-ignore
    r.sort((a,b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name))
    
    fs.writeFileSync(path.resolve('./src/components/resources.json'), JSON.stringify(r, null, 2), 'utf8')
  })
}

getResources()