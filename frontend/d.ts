

declare module 'nprogress' {
  export function start(): any;
  export function done(): any;
}

interface RenderProps {
  data: {
    items: Array<{
      id: number | string
      title: String,
      price: number,
      description: String,
      image: string
    }>
  },
  error?: any,
  loading: boolean
}