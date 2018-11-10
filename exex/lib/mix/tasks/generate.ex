defmodule Mix.Tasks.Exex.Generate do
  use Mix.Task

  @shortdoc "Generate a story"
  def run(_) do
    Exex.hello()
  end
end
