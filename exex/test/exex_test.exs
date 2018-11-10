defmodule ExexTest do
  use ExUnit.Case
  doctest Exex

  test "greets the world" do
    assert Exex.hello() == :world
  end
end
