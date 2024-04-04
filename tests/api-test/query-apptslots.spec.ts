import { test, expect } from '@playwright/test';

test.describe('query appointment time slots', () => {

  const testData = JSON.parse(JSON.stringify(require("../../test-data/appt-slots.json")))
  const validApptBenchmark = JSON.parse(JSON.stringify(require("../../benchmarks/valid-appt-slots-benchmark.json")))
  const apptSlotErrors = JSON.parse(JSON.stringify(require("../../benchmarks/appt-slots-erros.json")))
  const invalidApptSlotsQuery = JSON.parse(JSON.stringify(require("../../benchmarks/invalid-appt-slots-query.json")))
  const baseURL = 'https://henry-dev.hasura.app/v1/graphql';

  test('query available appointment slots from valid states', async ({ request }) => {
    const data = testData[0];
    const response = await request.post(baseURL, { data });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    const startTime = new Date(responseBody.data.cappedAvailableTimes[0].startTime);
    const endTime = new Date(responseBody.data.cappedAvailableTimes[0].endTime);
    expect(endTime.getTime() - startTime.getTime()).toBe(15 * 60 * 1000);
    expect(responseBody.data.cappedAvailableTimes.length).not.toBe(0);
    expect(responseBody.data.cappedAvailableTimes[0].provider.displayName).toBe(validApptBenchmark.data.cappedAvailableTimes[0].provider.displayName);
    expect(responseBody.data.cappedAvailableTimes[0].provider.__typename).toBe(validApptBenchmark.data.cappedAvailableTimes[0].provider.__typename);
    expect(responseBody.data.cappedAvailableTimes[0].__typename).toBe(validApptBenchmark.data.cappedAvailableTimes[0].__typename);
  })

  test('query appointment slots from invalid states', async ({ request }) => {
    const data = testData[1];
    const response = await request.post(baseURL, { data });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.cappedAvailableTimes.length).toBe(0);
  })

  test('query appointment slots from other states', async ({ request }) => {
    const data = testData[4];
    const response = await request.post(baseURL, { data });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.cappedAvailableTimes.length).toBe(0);
  })

  test('query appointment slots from invalid operation name', async ({ request }) => {
    const data = testData[2];
    const response = await request.post(baseURL, { data });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.errors[0].message).toBe(apptSlotErrors.errors[0].message);
    expect(responseBody.errors[0].extensions.path).toBe(apptSlotErrors.errors[0].extensions.path);
    expect(responseBody.errors[0].extensions.code).toBe(apptSlotErrors.errors[0].extensions.code);
  })

  test('query appointment slots from invalid treatment short id', async ({ request }) => {
    const data = testData[3];
    const response = await request.post(baseURL, { data });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.cappedAvailableTimes.length).toBe(0);
  })

  test('query appointment slots from null query', async ({ request }) => {
    const data = testData[5];
    const response = await request.post(baseURL, { data });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.errors[0].message).toBe(invalidApptSlotsQuery.errors[0].message);
    expect(responseBody.errors[0].extensions.path).toBe(invalidApptSlotsQuery.errors[0].extensions.path);
    expect(responseBody.errors[0].extensions.code).toBe(invalidApptSlotsQuery.errors[0].extensions.code);
  })
})



