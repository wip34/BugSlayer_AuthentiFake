/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MediaAssetContract extends Contract {

    async mediaAssetExists(ctx, mediaAssetId) {
        const buffer = await ctx.stub.getState(mediaAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createMediaAsset(ctx, mediaAssetId, socialMedia, locationUploaded, dateTime) {
        const exists = await this.mediaAssetExists(ctx, mediaAssetId);
        if (exists) {
            throw new Error(`The media asset ${mediaAssetId} already exists`);
        }
        const asset = { socialMedia , locationUploaded, dateTime};
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(mediaAssetId, buffer);
    }

    async readMediaAsset(ctx, mediaAssetId) {
        const exists = await this.mediaAssetExists(ctx, mediaAssetId);
        if (!exists) {
            throw new Error(`The media asset ${mediaAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(mediaAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateMediaAsset(ctx, mediaAssetId, newSocialMedia) {
        const exists = await this.mediaAssetExists(ctx, mediaAssetId);
        if (!exists) {
            throw new Error(`The media asset ${mediaAssetId} does not exist`);
        }
        const asset = { socialMedia: newSocialMedia };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(mediaAssetId, buffer);
    }

    async deleteMediaAsset(ctx, mediaAssetId) {
        const exists = await this.mediaAssetExists(ctx, mediaAssetId);
        if (!exists) {
            throw new Error(`The media asset ${mediaAssetId} does not exist`);
        }
        await ctx.stub.deleteState(mediaAssetId);
    }

    /***  ****/
    /**
     * Query by socialMedia
     *
     * @param {Context} ctx the transaction context
     * @param {String} socialMedia the social media (organization) that uploaded the media
    */
   async queryByIssuer(ctx, socialMedia) {

    let queryString = {
        "selector": {
            "socialMedia": socialMedia
        }
        //"use_index": ["_design/socialMediaIndexDoc", "socialMediaIndex"]
    }

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

    }

    /**
     * Query by location uploaded
     *
     * @param {Context} ctx the transaction context
     * @param {String} locationUploaded location the where the media was uploaded
    */
   async queryByOwner(ctx, locationUploaded) {

    let queryString = {
        "selector": {
            "locationUploaded": locationUploaded
        }
        //"use_index": ["_design/locationUploadedIndexDoc", "locationUploadedIndex"]
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

    }

        /**
     * Query by Issuer
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
    */
   async queryAll(ctx) {

    let queryString = {
        "selector": {}
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

   }

    /**
     * Evaluate a queryString
     *
     * @param {Context} ctx the transaction context
     * @param {String} queryString the query string to be evaluated
    */    
   async queryWithQueryString(ctx, queryString) {

    console.log("query String");
    /*queryString = {
        "selector": {}
    }*/
    
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);
    console.log(resultsIterator);

    let allResults = [];

    while (true) {
        let res = await resultsIterator.next();

        if (res.value && res.value.value.toString()) {
            let jsonRes = {};

            console.log(res.value.value.toString('utf8'));

            jsonRes.Key = res.value.key;

            try {
                jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                jsonRes.Record = res.value.value.toString('utf8');
            }

            allResults.push(jsonRes);
        }
        if (res.done) {
            console.log('end of data');
            await resultsIterator.close();
            console.info(allResults);
            console.log(JSON.stringify(allResults));
            return JSON.stringify(allResults);
        }
    }

    }

}

module.exports = MediaAssetContract;
