const BASE_URL = 'https://api.helius.xyz';
const API_KEY = 'bbe70d95-0bf9-479f-9e98-ce7a4184be6f';
const COLLECTION_ADDRESS = '9fupvukumtJFVsph3itwGpxAY8QE3ePQFrHtiFQbBpJg'; // Drunken Ape Social Club

const createCollectionWebhook = async () => {
    try {
        const mints = await getMints();
        const webhookId = await createWebhook(mints);
        console.log(`Created webhook ${webhookId}!`);
    } catch (ex) {
        console.error('Error occurred: ', ex);
    }
};

const getMints = async () => {
    const url = `${BASE_URL}/v1/mintlist?api-key=${API_KEY}`;
    const { data } = await axios.post(url, {
        query: {
            verifiedCollectionAddresses: [COLLECTION_ADDRESS],
        },
        options: {
            limit: 10_000,
        },
    });
    return data.result.map((x) => x.mint);
};

const createWebhook = async (mints) => {
    const url = `${BASE_URL}/v0/webhooks?api-key=${API_KEY}`;
    const { data } = await axios.post(url, {
        webhookURL: 'https://api.helius.xyz',
        transactionTypes: ['NFT_SALE'],
        accountAddresses: mints,
        webhookType: 'enhanced',
    });
    return data.webhookID;
};

createCollectionWebhook();
