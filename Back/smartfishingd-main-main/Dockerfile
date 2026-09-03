# Etapa 1: build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY smartfishingd-main/ .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Etapa 2: execução
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
