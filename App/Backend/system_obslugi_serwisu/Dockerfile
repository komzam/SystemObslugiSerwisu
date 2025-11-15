FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base

RUN mkdir -p /home/app/.aspnet/DataProtection-Keys \
    && chown -R app:app /home/app/.aspnet

USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["system_obslugi_serwisu/system_obslugi_serwisu.csproj", "system_obslugi_serwisu/"]
RUN dotnet restore "system_obslugi_serwisu/system_obslugi_serwisu.csproj"
COPY . .
WORKDIR "/src/system_obslugi_serwisu"
RUN dotnet build "./system_obslugi_serwisu.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./system_obslugi_serwisu.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "system_obslugi_serwisu.dll"]
