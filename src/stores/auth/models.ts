import type {
  Session as SupaBaseSessionType,
  User as SupaBaseUserType
} from '@supabase/supabase-js'
import { type ComputedRef } from 'vue'

export type useAuthStateType = {
  user: SupaBaseUserType | null
  session: SupaBaseSessionType | null
  isAuth: ComputedRef<boolean>
  id: ComputedRef<string>
  name: ComputedRef<string>
  email: ComputedRef<string>
  avatar: ComputedRef<string>
  createdAt: ComputedRef<Date> | null
}
