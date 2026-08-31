declare module "plotly.js-dist-min" {
  type PlotlyLayout = Record<string, unknown>;
  type PlotlyTrace = Record<string, unknown>;
  type PlotlyConfig = Record<string, unknown>;

  const Plotly: {
    react: (root: HTMLElement, data: PlotlyTrace[], layout?: PlotlyLayout, config?: PlotlyConfig) => Promise<unknown>;
    purge: (root: HTMLElement) => void;
  };

  export default Plotly;
}
