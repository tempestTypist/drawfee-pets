// import { QUERY_ALLPETS } from '../../utils/queries';

// const imageImport = () => {
// 	const { data } = useQuery(QUERY_ALLPETS);
// 	const pets = data?.allpets || [];
	
// 	const allPets = pets.map((pet) => (
// 		`${pet.petSpecies}:` + require(`./pets/${pet.petSpecies}.png`).default
// 	))

// 	return allPets
// }

	const ALLPETS = {
	Abgnomel: require('./pets/Abgnomel.png').default,
	Ainteasy: require('./pets/Ainteasy.png').default,
	Berd: require('./pets/Berd.png').default,
	BingyJr: require('./pets/BingyJr.png').default,
	Bingy: require('./pets/Bingy.png').default,
	BoyCatFerret: require('./pets/BoyCatFerret.png').default,
	Bugfren: require('./pets/Bugfren.png').default,
	Cantelope: require('./pets/Cantelope.png').default,
	ChuckyBeef: require('./pets/ChuckyBeef.png').default,
	Cobranero: require('./pets/Cobranero.png').default,
	Creamboymon: require('./pets/Creamboymon.png').default,
	Dragorb: require('./pets/Dragorb.png').default,
	Egglephant: require('./pets/Egglephant.png').default,
	FecisFindo: require('./pets/FecisFindo.png').default,
	Focacciaman: require('./pets/Focacciaman.png').default,
	Froggernaut: require('./pets/Froggernaut.png').default,
	Gainsheen: require('./pets/Gainsheen.png').default,
	Gamerbear: require('./pets/Gamerbear.png').default,
	Gatorgolf: require('./pets/Gatorgolf.png').default,
	God: require('./pets/God.png').default,
	Gooliahorse: require('./pets/Gooliahorse.png').default,
	Hamline: require('./pets/Hamline.png').default,
	Hockeyfan: require('./pets/Hockeyfan.png').default,
	Horbe: require('./pets/Horbe.png').default,
	ListeningApe: require('./pets/ListeningApe.png').default,
	McBomination: require('./pets/McBomination.png').default,
	MewFO: require('./pets/MewFO.png').default,
	Mobpsycho: require('./pets/Mobpsycho.png').default,
	Punkitty: require('./pets/Punkitty.png').default,
	Schmallet: require('./pets/Schmallet.png').default,
	Shydogge: require('./pets/Shydogge.png').default,
	Snaithan: require('./pets/Snaithan.png').default,
	Snoozle: require('./pets/Snoozle.png').default,
	Squishisaurus: require('./pets/Squishisaurus.png').default,
	Sycophrog: require('./pets/Sycophrog.png').default,
	Wattafren: require('./pets/Wattafren.png').default,
	}

export default ALLPETS;