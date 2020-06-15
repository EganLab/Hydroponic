<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null
    };
  },
  props: {
    mode: String
  },
  async mounted() {
    await this.loadChart();
  },
  watch: {
    async mode() {
      if (this.mode === "Minute") {
        this.renderChart(
          {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "Data One",
                borderColor: "#FC2525",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      } else if (this.mode === "Hour") {
        this.renderChart(
          {
            labels: ["sldksd", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "Data One",
                borderColor: "#FC2525",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      } else if (this.mode === "From start") {
        this.renderChart(
          {
            labels: ["January", "February", "dsfdsffdsd", "April", "May", "June", "July"],
            datasets: [
              {
                label: "Data One",
                borderColor: "#FC2525",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "white",
                backgroundColor: this.gradient,
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      }
    }
  },
  methods: {
    loadChart: async function() {
      this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);

      this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      this.renderChart(
        {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "Data One",
              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "white",
              backgroundColor: this.gradient,
              data: [40, 39, 10, 40, 39, 80, 40]
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  }
};
</script>
