const app = require('../server');
const supertest = require('supertest');


test("POST and DELETE /api/v1/item", async() => {
    const data = {
        name: "TV Sony",
        stock: 40,
        price: 8000,
        category: "Electronics"
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    await supertest(app)
        .delete('/api/v1/item/' + create.body.data.id)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        })
})

test("GET /api/v1/item", async() => {
    const data = {
        name: "TV LG",
        stock: 40,
        price: 2000000,
        category: "Electronics"
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    await supertest(app)
        .get("/api/v1/item")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("GET /api/v1/item/:id", async() => {
    const data = {
        name: "TV udin",
        stock: 40,
        price: 1800000,
        category: "Electronics"
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    await supertest(app)
        .get("/api/v1/item/" + create.body.data.id)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
    await supertest(app)
        .delete("/api/v1/item/" + create.body.data.id)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})
test("GET /api/v1/item/search/:keyword", async() => {
    const keyword = "tv"
    await supertest(app)
        .get("/api/v1/item/search/" + keyword)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("GET /api/v1/item/category/:category", async() => {
    await supertest(app)
        .get("/api/v1/item/category/Electronics")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})

test("PUT /api/v1/item/:id", async() => {
    const data = {
        name: "Keyboard Logitech",
        stock: 40,
        price: 1800000,
        category: "Electronics"
    }
    const update = {
        name: "Mouse Logitech"
    }
    const create = await supertest(app).post('/api/v1/item').send(data)
    await supertest(app)
        .put("/api/v1/item/" + create.body.data.id)
        .send(update)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe("success")
        })
})