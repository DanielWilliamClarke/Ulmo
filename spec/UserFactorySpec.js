"use strict"

describe("The UserFactory class", () => {

  const UserFactory = require("./../lib/UserFactory");

  it("Can mock out database connection and control flow of execution", () => {

    const mockDatabaseConnection = jasmine.createSpyObj("mockDB", ["query"]);

    mockDatabaseConnection.query.and.callFake((sql, params, callback) => {
      /* (error, data) */
      callback(null, [{
        productName: "test",
        productPrice: 100,
        productPercentage: 100
      }]);
    });

    const mockCurrencyFormatter = jasmine.createSpyObj("mockCF", ["format"]);
    /* just return the value passed in */
    mockCurrencyFormatter.format.and.callFake((amount, _) => amount);

    const userFactory = new UserFactory(mockDatabaseConnection, mockCurrencyFormatter);

    const mockCallback = jasmine.createSpy("mockCallback");
    const userID = 1;
    userFactory.GetProductsByUser(userID, mockCallback);

    /* latest verison of jasmine-node does not include toHaveBeenCalledTimes */
    expect(mockDatabaseConnection.query.calls.count()).toEqual(1);
    expect(mockDatabaseConnection.query).toHaveBeenCalledWith(
      jasmine.any(String),
      jasmine.objectContaining({
        0: userID
      }),
      jasmine.any(Function));

    expect(mockDatabaseConnection.query).not.toThrow(TypeError);

    /* here I am emulating that I have this object at key 0 */
    /* latest version of jasmine has arrayContains but jasmine-node is only up to 2.0.1 */
    expect(mockCallback).toHaveBeenCalledWith(jasmine.objectContaining({
      0: {
        name: jasmine.any(String),
        price: jasmine.any(Number),
        percentage: jasmine.any(Number)
      }
    }));

    expect(mockCurrencyFormatter.format.calls.count()).toEqual(1);
  })
})
