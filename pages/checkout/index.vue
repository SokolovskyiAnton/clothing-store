<template>
  
</template>

<script>
export default {
    name: 'Checkout',
    data() {
        return {
            card: '',
            payment_intent: null
        }
    },
    mounted() {
        // if (this.$stripe) {
        //     const elements = this.$stripe.elements();
        //     this.card = elements.create('card', {});
        //     this.card.mount(this.$refs.card);
        // }
    },
    methods: {
        async pay() {
            try {
                const payment = await this.$stripe.confirmCardPayment(this.payment_intent, {
                    payment_method: {
                        card: this.card
                    }
                })
                this.card.clear()
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
