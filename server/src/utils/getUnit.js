function getUnit(quantity) {
	switch (quantity) {
		case 'temperature':
			return '°C';
		case 'humidity':
			return '%';
		case 'force':
			return 'N';
	}
}

export default getUnit;