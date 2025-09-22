describe('API Authentication + Cart', () => {
    const user = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`, // unique email
      password: 'Test1234!'
    }
  
    const productSku = '24-MB01' // demo product
  
    it('registers a user via API', () => {
      // Create new customer
      cy.apiRegister(user).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('id')
      })
    })
  
    it('logs in a user via API', () => {
      // Login and store token
      cy.apiLogin(user).then(() => {
        const token = window.localStorage.getItem('customerToken')
        expect(token).to.exist
      })
    })
  
    it('adds product to cart via API', () => {
      // Use token from localStorage
      const token = window.localStorage.getItem('customerToken')
  
      // Add product to cart
      cy.request({
        method: 'POST',
        url: '/rest/default/V1/carts/mine/items',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          cartItem: { sku: productSku, qty: 1, quote_id: 'cart' }
        }
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.sku).to.eq(productSku)
      })
    })
})