import { AppConfig } from '@ecronix/base-shell'
import { TransitionProps } from '@mui/material/transitions'

export type TransitionComponentProps = TransitionProps & {
  children: React.ReactElement
}

export type IProviderProps = {
  children: React.ReactNode
  persistKey?: string
  appConfig?: AppConfig
}

export type SortOrientationType = 1 | -1
export type Operators = '=' | '>' | '<' | '!=' | '<=' | '>=' | 'like' | '!like'
export type OperatorType = { label: string; value: string }
export type FieldType = {
  name: string
  label?: string
  type: 'text' | 'number' | 'bool' | 'time' | 'date'
  sort?: any
  filter?: any
}

export type ThemeType = {
  id: string
  color: string
  source: {
    palette: {
      primary: string
      secondary: string
      error: string
    }
  }
}

export type MenuItemType =
  | {
      value: string
      nestedItems?: never
      visible?: boolean
      primaryText: string
      subheader?: string
      leftIcon: React.ReactNode
      onClick?: () => void
      divider?: boolean
      style?: React.CSSProperties
    }
  | {
      value?: never
      nestedItems: MenuItemType[]
      visible?: boolean
      primaryText: string
      subheader?: string
      leftIcon: React.ReactNode
      onClick?: () => void
      divider?: boolean
      style?: React.CSSProperties
    }
