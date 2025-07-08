import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/favored')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/favored"!</div>
}
