"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useFilmes from "@/hooks/useFilmes";
import useGeneros from "@/hooks/useGeneros";
import {
	LupaIcon,
	MinusIcon,
	NextPageIcon,
	PlusBlackIcon,
	PlusIcon,
	PreviousPageIcon,
} from "../../../public/icons";
import noImage from "../../../public/noImage.jpg";

const inter = Inter({ subsets: ["latin"] });

function MoviesContent() {
	const [generosSelecionados, setGenerosSelecionados] = useState<string[]>([]);
	const [pagina, setPagina] = useState<number>(1);
	const [modal, setModal] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const termoInicial = searchParams.get("search") || "";
	const { data } = useFilmes(pagina, 10);
	const [busca, setBusca] = useState(termoInicial);
	const { data: generos = [] } = useGeneros();

	const metadata = data?.metadata;
	const filmes = data?.data ?? [];

	function alternarGeneros(genero: string) {
		if (generosSelecionados.includes(genero)) {
			setGenerosSelecionados(
				generosSelecionados.filter((genre) => genre !== genero),
			);
		} else {
			setGenerosSelecionados([...generosSelecionados, genero]);
		}
	}

	function limparGeneros() {
		setGenerosSelecionados([]);
	}

	useEffect(() => {
		setBusca(termoInicial);
	}, [termoInicial]);

	const filmesFiltrados = filmes.filter((filme) => {
		const filmePesquisa = filme.title
			.toLowerCase()
			.includes(busca.toLowerCase());
		const combinaGenero =
			generosSelecionados.length === 0 ||
			filme.genres.some((g) => generosSelecionados.includes(g.name));

		return filmePesquisa && combinaGenero;
	});

	return (
		<>
			<Navbar />
			<div className={`${inter.className} flex flex-1 flex-col`}>
				<main className="flex flex-1 flex-col bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
					<div className="flex w-full relative">
						<div className="absolute top-27 left-29">
							<LupaIcon />
						</div>
						<Input
							placeholder="Pesquisar..."
							className="pl-16 text-black flex bg-white mx-25 my-23.75 h-17.5 rounded-full! border-[#10840C]"
							onChange={(e) => setBusca(e.target.value)}
						></Input>
					</div>
					<div className="grid grid-cols-8">
						<Button
							onClick={() => setModal(!modal)}
							className="w-50 h-16 rounded-[1000px] cursor-pointer bg-[#19AE14] ml-25"
						>
							<PlusIcon />
							<p className="ml-3 text-base">Adicionar Filtro</p>
						</Button>
						{generosSelecionados.map((genero) => (
							<Button
								key={genero}
								onClick={() => alternarGeneros(genero)}
								className=" text-white cursor-pointer w-50 h-16 rounded-[1000px] cursor-pointer bg-[#19AE14] ml-25"
							>
								<div className="flex flex-row  justify-center items-center">
									<MinusIcon />
									<p className="ml-3 text-lg">{genero}</p>
								</div>
							</Button>
						))}
					</div>
					<section className="mx-auto grid grid-cols-5 px-25 gap-8 py-[70px] w-[1440px] items-center justify-center">
						{filmesFiltrados.map((filme) => (
							<Link href={`/movies/${filme.id}`} key={filme.id}>
								<Image
									className="w-[220px] h-[349px] object-cover"
									src={filme.posterImageUrl || noImage}
									width={220}
									height={349}
									alt="poster"
								></Image>
							</Link>
						))}
					</section>
					<div className="flex flex-row justify-center items-center gap-4 mb-10">
						<Button
							disabled={
								!metadata || metadata.currentPage === metadata.firstPage
							}
							onClick={() => setPagina((p) => p - 1)}
							className="bg-transparent text-white rounded-[1000px]! cursor-pointer hover:bg-transparent! w-8 h-8 flex items-center justify-center"
						>
							<PreviousPageIcon />
						</Button>

						<button
							type="button"
							onClick={() => setPagina(1)}
							className={
								pagina === 1
									? "bg-[#3539EF] rounded-[1000px]! hover:bg-blue-800 cursor-pointer text-white w-8 h-8 flex items-center justify-center"
									: "bg-[#BDB7B6] rounded-[1000px]! hover:bg-gray-500 cursor-pointer text-white w-8 h-8 flex items-center justify-center"
							}
						>
							1
						</button>
						<button
							type="button"
							onClick={() => setPagina(2)}
							className={
								pagina === 2
									? "bg-[#3539EF] rounded-[1000px]! hover:bg-blue-800 cursor-pointer text-white w-8 h-8 flex items-center justify-center"
									: "bg-[#BDB7B6] rounded-[1000px]! hover:bg-gray-500 cursor-pointer text-white w-8 h-8 flex items-center justify-center"
							}
						>
							2
						</button>
						<button
							type="button"
							onClick={() => setPagina(3)}
							className={
								pagina === 3
									? "bg-[#3539EF] rounded-[1000px]! hover:bg-blue-800  cursor-pointer text-white w-8 h-8 flex items-center justify-center"
									: "bg-[#BDB7B6] rounded-[1000px]! hover:bg-gray-500 cursor-pointer text-white w-8 h-8 flex items-center justify-center"
							}
						>
							3
						</button>
						<button
							type="button"
							onClick={() => setPagina(4)}
							className={
								pagina === 4
									? "bg-[#3539EF] rounded-[1000px]! hover:bg-blue-800  cursor-pointer text-white w-8 h-8 flex items-center justify-center"
									: "bg-[#BDB7B6] rounded-[1000px]!  hover:bg-gray-500 cursor-pointer text-white w-8 h-8 flex items-center justify-center"
							}
						>
							4
						</button>
						<button
							type="button"
							onClick={() => setPagina(5)}
							className={
								pagina === 5
									? "bg-[#3539EF] rounded-[1000px]! hover:bg-blue-800  cursor-pointer text-white w-8 h-8 flex items-center justify-center"
									: "bg-[#BDB7B6] rounded-[1000px]! hover:bg-gray-500  cursor-pointer text-white w-8 h-8 flex items-center justify-center"
							}
						>
							5
						</button>

						<Button
							disabled={!metadata || metadata.currentPage === metadata.lastPage}
							onClick={() => setPagina((p) => p + 1)}
							className="bg-transparent text-white rounded-[1000px]! cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-transparent!"
						>
							<NextPageIcon />
						</Button>
					</div>
				</main>
			</div>
			{modal && (
				<Dialog open={modal} onOpenChange={setModal}>
					<div className={inter.className}>
						<DialogContent className={inter.className}>
							<DialogHeader>
								<DialogTitle className="mt-10 text-xl">Gênero:</DialogTitle>
							</DialogHeader>

							<FieldGroup>
								<div className="grid grid-rows-3 grid-cols-4 gap-2">
									{generos.map((genero) => (
										<Button
											key={genero.name}
											onClick={() => alternarGeneros(genero.name)}
											type="submit"
											className={
												generosSelecionados.includes(genero.name)
													? "px-5 text-white cursor-pointer flex flex-row items-center justify-center bg-[#10840C] border-[#10840C] hover:bg-[#00ca00] rounded-[1000px]"
													: "px-5 text-black cursor-pointer flex flex-row items-center justify-center bg-transparent border-[#10840C] hover:bg-[#b1b1b169] rounded-[1000px]"
											}
										>
											{generosSelecionados.includes(genero.name) ? (
												<MinusIcon />
											) : (
												<PlusBlackIcon />
											)}
											<p className="font-bold">{genero.name}</p>
										</Button>
									))}
								</div>
							</FieldGroup>
							<DialogFooter>
								<Button
									onClick={() => limparGeneros()}
									className="text-white bg-[#71090C] cursor-pointer rounded-[1000px]"
								>
									Apagar Todos os Filtros
								</Button>
								<DialogClose
									render={
										<Button
											className="bg-[#1419AE] hover:bg-[#000058] text-white rounded-[1000px]! cursor-pointer"
											variant="outline"
										>
											Concluir
										</Button>
									}
								/>
							</DialogFooter>
						</DialogContent>
					</div>
				</Dialog>
			)}
			<Footer />
		</>
	);
}

export default function MoviesPage() {
	return (
		<Suspense
			fallback={
				<div className="flex w-full h-screen items-center justify-center">
					Carregando...
				</div>
			}
		>
			<MoviesContent />
		</Suspense>
	);
}
