import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";

/*
  This test suite requires a server running at:

  <http://localhost:3000>

  The project includes the json-server and test data, which you can start with:

  json-server ./server-data/data.json
*/

describe("Fetch", () => {
  test("call fetch gets addresses", () => {
    return fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
      });
  });

  test("call fetch gets addresses with done", done => {
    fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
        done();
      })
      .catch(error => done(error));
  });

  test("call fetch with async/await", async () => {
    const promise = await fetch("http://localhost:3000/addresses");
    const addresses = await promise.json();

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and JSON.parse()", async () => {
    const promise = await fetch("http://localhost:3000/addresses");
    const addresses = JSON.parse(await promise.text());

    expect(addresses.length).toBe(12);
  });

  test("call fetch with caught error", async () => {
    try {
      const promise = await fetch("htsssstp://localhost:3000/addresses");
      return await promise.json();
    } catch (error) {
      const e = error; // Für Debugging
      // Error wird ignoriert
    } finally {
      // Wird immer ausgeführt (cleanup, logging, usw.)
    }
  });

  async function getAddresses() {
    const response = await fetch("http://localhost:3000/addresses");
    return await response.json();
  }

  async function getCars() {
    const response = await fetch("http://localhost:3000/cars");
    return await response.json();
  }

  test("wait for multiple fetch calls", async () => {
    const addressPromise = getAddresses();
    const carPromise = getCars();

    const [addresses, cars] = await Promise.all([addressPromise, carPromise]);

    expect(addresses.length).toBe(12);
    expect(cars.length).toBe(2);
  });
});
