const address='0x4cfceea3266951452020f8ddbdead1215eeb4099';
const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "ruleId",
				"type": "bytes32"
			},
			{
				"name": "cost",
				"type": "uint256"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "addPenalty",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "stop",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "hasDisqualification",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "_scores",
				"type": "bytes32[]"
			}
		],
		"name": "addRound",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "names",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "first",
				"type": "string"
			},
			{
				"name": "middle",
				"type": "string"
			},
			{
				"name": "last",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "rules",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "competitorId",
				"type": "bytes32"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "addScore",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "divisionId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "hasCompetitor",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "staff",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			},
			{
				"name": "role",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "endDateTime",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			}
		],
		"name": "getCompetitors",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "teams",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "scores",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "competitor",
				"type": "bytes32"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "newId",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "addDisqualification",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			},
			{
				"name": "role",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "setAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newName",
				"type": "string"
			}
		],
		"name": "setTitle",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "divisionId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "removeCompetitor",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "audience",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			},
			{
				"name": "role",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "athletes",
		"outputs": [
			{
				"name": "person",
				"type": "bytes32"
			},
			{
				"name": "weightMajor",
				"type": "uint8"
			},
			{
				"name": "weightMinor",
				"type": "uint8"
			},
			{
				"name": "heightMajor",
				"type": "uint8"
			},
			{
				"name": "heightMinor",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startDateTime",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "weights",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "major",
				"type": "uint8"
			},
			{
				"name": "minor",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "middleName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "weightMajor",
				"type": "uint8"
			},
			{
				"name": "weightMinor",
				"type": "uint8"
			},
			{
				"name": "heightMajor",
				"type": "uint8"
			},
			{
				"name": "heightMinor",
				"type": "uint8"
			}
		],
		"name": "addAthlete",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "competitors",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "typeOf",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "addDiscontinuance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			}
		],
		"name": "addRule",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "sports",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "matches",
		"outputs": [
			{
				"name": "duration",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			},
			{
				"name": "division",
				"type": "bytes32"
			},
			{
				"name": "disqualification",
				"type": "bytes32"
			},
			{
				"name": "discontinuance",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "divisionId",
				"type": "bytes32"
			}
		],
		"name": "hasMatch",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_start",
				"type": "string"
			}
		],
		"name": "setStartDateTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			},
			{
				"name": "sportId",
				"type": "bytes32"
			},
			{
				"name": "weightMajor",
				"type": "uint8"
			},
			{
				"name": "weightMinor",
				"type": "uint8"
			}
		],
		"name": "addDivision",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "start",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_end",
				"type": "string"
			}
		],
		"name": "setEndDateTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "penaltyId",
				"type": "bytes32"
			}
		],
		"name": "hasPenalty",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "measurementType",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "divisionId",
				"type": "bytes32"
			},
			{
				"name": "comps",
				"type": "bytes32[]"
			},
			{
				"name": "duration",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			}
		],
		"name": "addMatch",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			}
		],
		"name": "getRounds",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "divisionId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "addCompetitor",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "divisions",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "sport",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			},
			{
				"name": "weightClass",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "notes",
				"type": "string"
			}
		],
		"name": "addSport",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "penalties",
		"outputs": [
			{
				"name": "rule",
				"type": "bytes32"
			},
			{
				"name": "cost",
				"type": "uint256"
			},
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "offender",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_start",
				"type": "string"
			},
			{
				"name": "_end",
				"type": "string"
			}
		],
		"name": "setDetails",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "divisionId",
				"type": "bytes32"
			}
		],
		"name": "removeMatch",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "hasDiscontinuance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "AthleteAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "SportAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "RuleAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "DivisionAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "divisionId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "CompetitorAddedToDivision",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "divisionId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "CompetitorRemovedFromDivision",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "CompetitorDisqualification",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "competitorId",
				"type": "bytes32"
			}
		],
		"name": "CompetitorDiscontinuance",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "divisionId",
				"type": "bytes32"
			}
		],
		"name": "MatchAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "matchId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "divisionId",
				"type": "bytes32"
			}
		],
		"name": "MatchRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "penaltyId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "competitorId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "PenaltyAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "roundId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "matchId",
				"type": "bytes32"
			}
		],
		"name": "RoundAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "scoredId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "competitorId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "ScoreAdded",
		"type": "event"
	}
];

export default { address, ABI };