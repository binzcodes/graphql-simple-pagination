const { paginationResolver } = require('../index')
const assert = require('chai').assert
const should = require('chai').should()
const expect = require('chai').expect

describe('paginationResolver(data, args, opts)', function() {
  describe('data', () => {
    it('should return an array', () => {
      let data = [{a:1},{b:2},{c:3}]
      let res = paginationResolver(data)
      assert.typeOf(res, 'array')
    })
  })
  describe('args', () => {
    it('should return all when no argument is provided', () => {
      let data = [{a:1},{b:2},{c:3}]
      let args = null
      let res = paginationResolver(data)
      assert.equal(res.length, 3);
      assert.typeOf(res, 'array')
    })
    it('should return all when the argument is false', () => {
      let data = [{a:1},{b:2},{c:3}]
      let args = false
      let res = paginationResolver(data, args)
      assert.equal(res.length, 3);
      assert.typeOf(res, 'array')
    })
    it('should return all when the argument is an empty object', () => {
      let data = [{a:1},{b:2},{c:3}]
      let args = {}
      let res = paginationResolver(data, args)
      assert.equal(paginationResolver(data, args).length, 3);
      assert.typeOf(res, 'array')
    })
    it('should return all when the argument is null', () => {
      let data = [{a:1},{b:2},{c:3}]
      let args = null
      let res = paginationResolver(data, args)
      assert.equal(res.length, 3);
      assert.typeOf(res, 'array')
    })
    it('should return all when the argument is null || {}', () => {
      let data = [{a:1},{b:2},{c:3}]
      let args = null
      let res = paginationResolver(data, args || {})
      assert.equal(res.length, 3);
      assert.typeOf(res, 'array')
    })
    it('should return all when the argument is undefined', () => {
      let data = [{a:1},{b:2},{c:3}]
      let args = undefined
      let res = paginationResolver(data, args)
      assert.equal(res.length, 3);
      assert.typeOf(res, 'array')
    })

    describe('sortBy', () => {
      it('should sort the array where sortBy is provided', () => {
        let data = [{a:3},{a:2},{a:1}]
        let args = { sortBy: 'a' }
        let res = paginationResolver(data, args)
        res.should.have.lengthOf(3)
        res[0].should.have.property('a', 1)
        res[2].should.have.property('a', 3)
        assert.typeOf(res, 'array')
      })
      it('should reverse the array sort when sortBy provided and descending is true', () => {
        let data = [{a:1},{a:2},{a:3}]
        let args = { sortBy: 'a', descending: true }
        let res = paginationResolver(data, args)
        res.should.have.lengthOf(3)
        res[0].should.have.property('a', 3)
        res[2].should.have.property('a', 1)
        assert.typeOf(res, 'array')
      })
    })
    describe('rowsPerPage', () => {
      it('should return a two item list when rowsPerPage is 2', () => {
        let data = [{a:1},{a:2},{a:3}]
        let args = { page: 0, rowsPerPage: 2, sortBy: 'a', descending: false }
        let res = paginationResolver(data, args)
        assert.typeOf(res, 'array')
        assert.lengthOf(res, 2)
      })
      it("should return all when rowsPerPage is 0", () => {
        let data = [{a: 1}, {b: 2}, {c: 3}];
        let args = {rowsPerPage: 0};
        let res = paginationResolver(data, args);
        // expect(paginationResolver(data, args)).to.throw(Error)
        assert.typeOf(res, "array");
        assert.equal(res.length, 3);
      });
      it('should return all when rowsPerPage is -1', () => {
        let data = [{a:1},{b:2},{c:3}]
        let args = { rowsPerPage: -1 }
        let res = paginationResolver(data, args)
        assert.typeOf(res, 'array')
        assert.equal(res.length, 3);
      })
      it('should return all when rowsPerPage is null', () => {
        let data = [{a:1},{b:2},{c:3}]
        let args = { rowsPerPage: null }
        let res = paginationResolver(data, args)
        assert.typeOf(res, 'array')
        assert.equal(res.length, 3);
      })
      it('should return all when rowsPerPage is undefined', () => {
        let data = [{a:1},{b:2},{c:3}]
        let args = { rowsPerPage: undefined }
        let res = paginationResolver(data, args)
        assert.typeOf(res, 'array')
        assert.equal(res.length, 3);
      })
    })
  })
})
