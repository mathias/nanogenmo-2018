defmodule Exex do
  @moduledoc """
  Documentation for Exex.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Exex.hello()
      :world

  """
  def hello() do
    #{:ok, filenames} = File.ls("inputs")

    #filenames
    #|> Enum.reduce("", fn filename, memo ->
      #{:ok, text} = File.read(filename)
      #memo <> "\n" <> text
    #end)
    #|> IO.puts
    #
    #text = read_files() #|> preprocess()

    #{:ok, chain} = Faust.generate_chain(text, 3)

    #{:ok, output} = Faust.traverse(chain, 1000)

    #IO.puts(output)
    IO.puts ascii_chapter_title()

    IO.puts "\n\n"

    IO.puts chapter_text()
  end

  def ascii_chapter_title() do
    text = read_files("ascii_art")

    {:ok, chain} = Faust.generate_chain(text, 2)

    {:ok, output} = Faust.traverse(chain, 100)

    output
  end

  def chapter_text() do
    text = read_files("inputs") |> preprocess()

    {:ok, chain} = Faust.generate_chain(text, 3)

    {:ok, output} = Faust.traverse(chain, 5000)

    output
  end

  defp read_files(dir) do
    {:ok, filenames} = File.ls(dir)

    filenames
    |> Enum.map(fn filename ->
      case File.read(dir <> "/" <> filename) do
        {:ok, text} -> text
        {:error, reason} -> IO.puts(reason)
      end
    end)
    |> Enum.join(" ")
  end

  defp preprocess(text) do
    text
    |> String.downcase
    |> String.replace(~r/[=\r*]+/, "")
    |> String.replace(~r/\n+/, " ")
  end
end
