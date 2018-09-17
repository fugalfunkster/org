defmodule AppleVarietal do
  defstruct name: "", color: "red", tannic: false
  def spitter?(%{tannic: true}), do: "spit it out!"
  def spitter?(%y{}), do: "chew your food"
end
