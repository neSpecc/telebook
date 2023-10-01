type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray

type JSONObject = Record<string, unknown>

interface JSONArray extends Array<JSONValue> { }

export default JSONValue
