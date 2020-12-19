const utlaEndpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=utla' +
    '&latestBy=cumCasesByPublishDate' +
    '&structure={"areaName":"areaName","cases":"cumCasesByPublishDate","rate":"cumCasesByPublishDateRate"}'
);

const nationEndpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation' +
    '&latestBy=cumCasesByPublishDate' +
    '&structure={"areaName":"areaName","cases":"cumCasesByPublishDate","rate":"cumCasesByPublishDateRate"}'
);

let copyData = null;

const getData = async () => {
    var utlaResult = await fetch(utlaEndpoint, { "method": "GET" });
    var nationResult = await fetch(nationEndpoint, { "method": "GET" });

    document.querySelector('.area-date').innerHTML = utlaResult.headers.get('Last-Modified');
    document.querySelector('.nation-date').innerHTML = nationResult.headers.get('Last-Modified');
    
    const utlaData = (await utlaResult.json()).data;
    const nationData = (await nationResult.json()).data;

    const data = {
        belfast: utlaData.find(d => d.areaName === 'Belfast'),
        birmingham: utlaData.find(d => d.areaName === 'Birmingham'),
        bradford: utlaData.find(d => d.areaName === 'Bradford'),
        bristol: utlaData.find(d => d.areaName === 'Bristol, City of'),
        edinburgh: utlaData.find(d => d.areaName === 'City of Edinburgh'),
        glasgow: utlaData.find(d => d.areaName === 'Glasgow City'),
        leeds: utlaData.find(d => d.areaName === 'Leeds'),
        leicester: utlaData.find(d => d.areaName === 'Leicester'),
        essex: utlaData.find(d => d.areaName === 'Essex'),
        manchester: utlaData.find(d => d.areaName === 'Manchester'),
        newcastle: utlaData.find(d => d.areaName === 'Newcastle upon Tyne'),
        nottinghamshire: utlaData.find(d => d.areaName === 'Nottinghamshire'),
    }

    const result = [
        data.belfast.rate,
        data.birmingham.rate,
        data.bradford.rate,
        data.bristol.rate,
        data.edinburgh.rate,
        data.glasgow.rate,
        data.leeds.rate,
        data.leicester.rate,
        data.essex.rate,
        data.manchester.rate,
        data.newcastle.rate,
        data.nottinghamshire.rate,
        '',
        data.belfast.cases,
        data.birmingham.cases,
        data.bradford.cases,
        data.bristol.cases,
        data.edinburgh.cases,
        data.glasgow.cases,
        data.leeds.cases,
        data.leicester.cases,
        data.essex.cases,
        data.manchester.cases,
        data.newcastle.cases,
        data.nottinghamshire.cases,
    ];

    copyData = result.join('\t');
    document.querySelector('button').disabled = false;
}

getData();

copy = () => {
  navigator.clipboard.writeText(copyData);
}