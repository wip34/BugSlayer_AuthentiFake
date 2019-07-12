/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { MediaAssetContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('MediaAssetContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new MediaAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"media asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"media asset 1002 value"}'));
    });

    describe('#mediaAssetExists', () => {

        it('should return true for a media asset', async () => {
            await contract.mediaAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a media asset that does not exist', async () => {
            await contract.mediaAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMediaAsset', () => {

        it('should create a media asset', async () => {
            await contract.createMediaAsset(ctx, '1003', 'media asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"media asset 1003 value"}'));
        });

        it('should throw an error for a media asset that already exists', async () => {
            await contract.createMediaAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The media asset 1001 already exists/);
        });

    });

    describe('#readMediaAsset', () => {

        it('should return a media asset', async () => {
            await contract.readMediaAsset(ctx, '1001').should.eventually.deep.equal({ value: 'media asset 1001 value' });
        });

        it('should throw an error for a media asset that does not exist', async () => {
            await contract.readMediaAsset(ctx, '1003').should.be.rejectedWith(/The media asset 1003 does not exist/);
        });

    });

    describe('#updateMediaAsset', () => {

        it('should update a media asset', async () => {
            await contract.updateMediaAsset(ctx, '1001', 'media asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"media asset 1001 new value"}'));
        });

        it('should throw an error for a media asset that does not exist', async () => {
            await contract.updateMediaAsset(ctx, '1003', 'media asset 1003 new value').should.be.rejectedWith(/The media asset 1003 does not exist/);
        });

    });

    describe('#deleteMediaAsset', () => {

        it('should delete a media asset', async () => {
            await contract.deleteMediaAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a media asset that does not exist', async () => {
            await contract.deleteMediaAsset(ctx, '1003').should.be.rejectedWith(/The media asset 1003 does not exist/);
        });

    });

});