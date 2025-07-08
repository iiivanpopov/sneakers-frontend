import { FormContainer } from './components/FormContainer'
import { Providers } from './providers'

export function AuthPage() {
  return (
    <Providers stage={{ defaultStage: 'signIn' }}>
      <FormContainer />
    </Providers>
  )
}
