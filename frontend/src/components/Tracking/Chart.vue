<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data: () => ({
    gradient: null
  }),
  props: {
    mode: String,
    data: Array
  },
  async mounted() {
    await this.loadChart();
  },
  watch: {
    async data() {
      // console.log(this.data);
      await this.loadData();
    }
  },
  methods: {
    loadChart: async function() {
      this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
      this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
      // console.log(this.data);
      this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
      this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
      this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    },
    loadData: async function() {
      if (this.data[0]) {
        this.renderChart(
          {
            labels: this.data[0].time,
            datasets: [
              {
                label: this.data[0].name,
                borderColor: "#FC2525",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: this.data[0].data
              },
              {
                label: this.data[1].name,
                borderColor: "#05CBE1",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient2,
                data: this.data[1].data
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      }
    }
  }
};
</script>
