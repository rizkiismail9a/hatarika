const { createApp } = Vue;

createApp({
  data() {
    return {
      isModalActive: false,
      isCartActive: false,
      hideBtn: false,
      products: [
        {
          id: 1,
          name: "White Sneakers",
          initialPrice: 900000,
          currPrice: 500000,
          file: "shoes-4.jpg",
          stock: 10,
          brand: "Puma",
        },
        {
          id: 2,
          name: "Red Sneakers",
          initialPrice: 5000000,
          currPrice: 3000000,
          file: "rednike.jpg",
          stock: 5,
          brand: "Nike",
        },
        {
          id: 3,
          name: "Blue Sneakers",
          initialPrice: 1500000,
          currPrice: 750000,
          file: "running-shoes.jpg",
          stock: 0,
        },
        {
          id: 4,
          name: "Boots",
          initialPrice: 3000000,
          currPrice: 2000000,
          file: "boots2.jpg",
          stock: 8,
          brand: "Boots",
        },
        {
          id: 5,
          name: "Pantofel Cokelat",
          initialPrice: 2000000,
          currPrice: 1000000,
          file: "pantofel.jpg",
          stock: 1,
          brand: "Pentofel",
        },
      ],
      specList: ["10 Oz canvas upper material", "Canvas lining material", "Polyester flat laces", "Rubber foxing and outsole", "Costum woven label"],
      sizeList: ["US5/UK4/EUR36/JP24", "US6.5/UK5.5/EUR38/JP25", "US7/UK6/EUR39/JP25.8", "US8/UK7/EUR40/JP26", "US11/UK10.5/EUR45/JP29.5"],
      packing: ["Normal", "Kayu", "Bubblewrap"],
      carts: [],
      choosenPackage: "Normal",
      choosenSize: "",
      quantity: 1,
      specialRequest: "",
      productOnDetail: [],
      address: ["Hatarika", "Jl. Sudirman No. XX", "hatarika@mail.com", "(021) 5353535"],
      collections: ["Sneakers", "Boots", "Slip On", "Pentofel"],
      socials: { twitter: "aset/images/twitter.png", instagram: "aset/images/instagram.png", pinterest: "aset/images/pinterest.png" },
      dataShown: [],
    };
  },
  mounted() {
    this.showProducts("all");
  },
  methods: {
    showProducts(data) {
      if (data === "all") {
        return (this.dataShown = this.products);
      } else {
        const findProduct = this.products.filter((item) => item.brand === data);
        return (this.dataShown = findProduct);
      }
    },
    filterProducts(string) {
      return this.showProducts(string);
    },
    seeDetail(id) {
      this.isModalActive = true;
      // console.log(id);
      const findProduct = this.products.find((item) => item.id === id);
      this.productOnDetail.push(findProduct);
    },
    closeModal() {
      this.isModalActive = false;
      (this.specialRequest = ""), (this.choosenSize = ""), (this.quantity = 1);
      this.productOnDetail = [];
      this.hideBtn = false;
    },
    addQuantity(id) {
      const findProduct = this.products.find((item) => item.id === id);
      this.compareAmount(id);
      if (this.quantity === findProduct.stock) {
        return findProduct.stock;
      } else {
        this.quantity++;
      }
    },
    subtractQuantity(id) {
      const findProduct = this.products.find((item) => item.id === id);
      this.compareAmount(id);
      if (this.quantity <= 1) {
        return this.quantity;
      } else {
        this.quantity--;
      }
    },
    compareAmount(id) {
      if (!this.quantity) {
        return (this.quantity = 1);
      }
      console.log(this.quantity);
      const findProduct = this.products.find((item) => item.id === id);
      if (this.quantity > findProduct.stock || this.quantity <= 0) {
        return (this.hideBtn = true);
      }
      return (this.hideBtn = false);
    },
    buyNow(id) {
      console.log(id);
      if (!this.choosenSize) {
        return alert("Pilih ukuran terlebih dahulu");
      }
      const amount = this.quantity;
      const findProduct = this.products.find((item) => item.id === id);
      const name = findProduct.name;
      console.log(name);
      const size = this.choosenSize;
      const request = this.specialRequest || "-";
      const packing = this.choosenPackage;
      window.location.href = `https://wa.me/6282317421414?text=Halo!%20Saya%20ingin%20memesan%0aProduk:%20${name}%0aUkuran:%20${size}%0aJumlah:%20${amount}%0aSpecial%20Request:%20${request}%0aPacking:%20${packing}%0a%0aTerima%20Kasih!`;
    },
    addToCart(id) {
      // console.log(id);
      if (!this.choosenSize) {
        return alert("Pilih ukuran terlebih dahulu");
      }
      const amount = parseInt(this.quantity);
      const findProduct = this.products.find((item) => item.id === id);
      const name = findProduct.name;
      const file = findProduct.file;
      const size = this.choosenSize;
      const price = findProduct.currPrice;
      const note = this.specialRequest || "-";
      const packing = this.choosenPackage;
      // cek apakah item dengan keterangan itu sudah ada
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i].name === name && this.carts[i].size === size && this.carts[i].note === note && this.carts[i].packing === packing) {
          this.carts[i].amount += amount;
          findProduct.stock = findProduct.stock - amount;
          this.closeModal();
          return alert("Produk berhasil meluncur ke keranjang!");
        }
      }
      const newItem = { name, size, note, packing, amount, file, price: price * amount };
      this.carts.push(newItem);
      findProduct.stock = findProduct.stock - amount;
      this.closeModal();
      this.isModalActive = false;
      return alert("Produk berhasil meluncur ke keranjang!");
    },
    deleteProduct(index) {
      this.carts.splice(index, 1);
    },
    makeOrder() {
      let order = "Halo!%20Saya%20ingin%20memesan:%0a%0a";
      this.carts.forEach((item) => {
        return (order += `Produk:%20${item.name}%0aUkuran:%20${item.size}%0aJumlah:%20${item.amount}%0aSpecial%20Request:%20${item.note}%0aPackaging:%20${item.packing}%0a%0a`);
      });
      return (window.location.href = `https://wa.me/6282317421414?text=${order}%0aTerima%20Kasih!🙏`);
    },
  },
  computed: {
    totalPrice() {
      let price0 = 0;
      this.carts.forEach((item) => (price0 += item.price * item.amount));
      return price0;
    },
  },
}).mount("#app");
