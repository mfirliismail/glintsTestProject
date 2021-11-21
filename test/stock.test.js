const app = require('../server');
const supertest = require('supertest');

test("POST /api/v1/stock/in/:id", async() => {
    const data = {
        name: "Headset Sony2",
        stock: 40,
        price: 1200000,
        category: "Electronics"
    }
    const stock = {
        stock: 10
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    await supertest(app)
        .post("/api/v1/stock/in/" + create.body.data.id)
        .send(stock)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })

})

test("GET /api/v1/stock/history/in/:itemId", async() => {
    const data = {
        name: "Headset Gaming Fantech2",
        stock: 40,
        price: 300000,
        category: "Electronics"
    }
    const stockin = {
        stock: 40
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    const createStock = await supertest(app).post("/api/v1/stock/in/" + create.body.data.id).send(stockin)
    await supertest(app)
        .get("/api/v1/stock/history/in/" + create.body.data.id)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("POST /api/v1/stock/out/:id", async() => {
    const data = {
        name: "Mouse Gaming2",
        stock: 20,
        price: 1800000,
        category: "Electronics"
    }
    const stock = {
        stock: 5
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    await supertest(app)
        .post("/api/v1/stock/out/" + create.body.data.id)
        .send(stock)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("GET /api/v1/stock/history/out/:itemId", async() => {
    const data = {
        name: "Headset SteelSeries2",
        stock: 40,
        price: 2199000,
        category: "Electronics"
    }
    const stockOut = {
        stock: 20
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    const createStock = await supertest(app).post("/api/v1/stock/out/" + create.body.data.id).send(stockOut)
    await supertest(app)
        .get("/api/v1/stock/history/out/" + create.body.data.id)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})