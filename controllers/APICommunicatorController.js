import React from 'react';

export default class APICommunicatorController {
    static GetBookDetailsFromApi = (searchParam) => { 
        return new Promise((resolve, reject) => {
            //fetch('http://192.168.4.66:25565/GetBookDetail',
            fetch('http://76.175.108.117:25565/GetBookDetail',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        searchType: 'profileBookLookUp',
                        searchValue: searchParam
                    })
            }
            ).then((response) => response.json())
            .then((json) => {
                resolve(json); 
            })
        })
    }

    static GetBookDetailsWithISBN = (searchParam) => { 
        return new Promise((resolve, reject) => {
            //fetch('http://192.168.4.66:25565/GetBookByISBN',
            fetch('http://76.175.108.117:25565/GetBookByISBN',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        searchType: 'profileBookLookUp',
                        searchValue: searchParam
                    })
            }
            ).then((response) => response.json())
            .then((json) => {
                resolve(json); 
            })
        })
    }
}


