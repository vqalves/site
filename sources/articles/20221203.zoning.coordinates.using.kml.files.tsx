import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const ZoningCoordinatesUsingKmlFiles20221203 = new Article({
    code: "221203",
    date: new ArticleDate(2022, 12, 3),
    
    title: new LocaleContentAny({
        en: "[C#] Discovering corresponding zone of a coordinate using KML file",
        pt: "[C#] Encontrando a zona correspondente a uma coordenada usando arquivo KML"
    }),
    slug: new LocaleContentText({
        en: "csharp-zoning-coordinates-using-kml-file",
        pt: "csharp-zoneando-coordenadas-com-arquivo-kml"
    }),

    tags: [ArticleTag.csharp],

    content: [
        new LocaleContentAny({
            en: (<p><a href="https://en.wikipedia.org/wiki/Keyhole_Markup_Language">KML</a> files are structured XMLs with geographic data for processing and rendering. Used by Google Maps, this format is considered an international standard by the <a href="https://en.wikipedia.org/wiki/Open_Geospatial_Consortium">OGC, international consortium related to geoprocessing</a>, since 2008.</p>),
            pt: (<p>Arquivos <a href="https://pt.wikipedia.org/wiki/Keyhole_Markup_Language">KML</a> são XMLs estruturados com dados geográficos para processamento e visualização. Popularmente usada pelo Google Maps, este formato é considerado um padrão internacional pela <a href="https://pt.wikipedia.org/wiki/Open_Geospatial_Consortium">OGC, consórcio internacional vinculado ao geoprocessamento</a>, desde 2008.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Zoning is a method of land division, where the land surface is sliced in non-overlapping polygons (or zones). This is method a common technique for urban planning and certain forms of geoprocessing.</p>),
            pt: (<p>Zoneamento é um método de divisão territorial, aonde uma superfície é fatiada em polígonos (ou zonas) que não se cruzam. Este método é popular para planejamento urbano e determinados tipos de geoprocessamento.</p>)
        }),

        new LocaleContentAny({
            en: (<p>To find the zone that contains a specific coordinate, the code must read all the polygons inside the KML, and check each polygon to find which one contains the coordinate. For that, this article uses the <a href="https://www.nuget.org/packages/SharpKml.Core/">SharpKml.Core</a> library, .NET Standard and MIT license, to read the KML file.</p>),
            pt: (<p>Para encontrar qual a zona correspondente a uma coordenada, o sistema deve ler todos os polígonos do KML, e para cada polígono, verificar se a coordenada está dentro do polígono. Para isso, este artigo usa a bibilioteca <a href="https://www.nuget.org/packages/SharpKml.Core/">SharpKml.Core</a>, .NET Standard e licença MIT, para navegação do arquivo KML.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The library does not implement a method to check if a coordinate is within a polygon, so this article make use of an <a href="https://stackoverflow.com/a/14998816">external algorithm</a>. This algorithm projects a line based on one of the coordinate axis, and declares a flag that alternates between "inside" and "outside" everytime the line crosses one of the polygon vertices.</p>),
            pt: (<p>No momento esta biblioteca não possui um método para verificar se um ponto está contido em um polígono, então estamos usando um <a href="https://stackoverflow.com/a/14998816">algoritmo externo</a>. Este algoritmo projeta uma linha baseado em um dos eixos da coordenada, e usa uma flag que alterna entre "dentro" e "fora" toda vez que a linha cruza com um dos vértices do polígono.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>SharpKml.Core installation</b></p>),
            pt: (<p><b>Instalação do SharpKml.Core</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`dotnet add package SharpKml.Core`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Main function</b></p>),
            pt: (<p><b>Função principal</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using SharpKml.Dom;
using SharpKml.Engine;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
            
public static string GetZone(string kmlFilePath, double latitude, double longitude)
{
    KmlFile kmlFile = LoadKmlFile(kmlFilePath);
    IEnumerable<Placemark> placemarks = EnumeratePlacemarks(kmlFile);

    foreach(Placemark placemark in placemarks)
    {
        IEnumerable<Polygon> polygons = EnumeratePolygons(placemark);

        foreach(Polygon polygon in polygons)
        {
            CoordinateCollection coordinates = GetPolygonCoordinates(polygon);

            if(WithinPolygon(coordinates, latitude, longitude))
            {
                return GetSimpleDataValue(placemark, "ZoneID");
            }
        }
    }

    return null;
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Auxiliary functions</b></p>),
            pt: (<p><b>Métodos auxiliares</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`private static KmlFile LoadKmlFile(string path)
{
    using (var stream = new FileStream(path, FileMode.Open))
        return KmlFile.Load(stream);
}

private static IEnumerable<Placemark> EnumeratePlacemarks(KmlFile file)
{
    return file.Root.Flatten().OfType<Placemark>();
}

private static IEnumerable<Polygon> EnumeratePolygons(Placemark placemark)
{
    var shape = placemark.Geometry;

    if (shape is Polygon)
    {
        yield return (Polygon)shape;
    }
    else if (shape is MultipleGeometry)
    {
        var multipleGeometry = (MultipleGeometry)shape;

        foreach (var geometry in multipleGeometry.Geometry)
            if (geometry is Polygon)
                yield return (Polygon)geometry;
    }
}

private static CoordinateCollection GetPolygonCoordinates(Polygon polygon)
{
    return polygon.OuterBoundary.LinearRing.Coordinates;
}

private static string GetSimpleDataValue(Placemark placemark, string attributeName)
{
    foreach (var schemaData in placemark.ExtendedData.SchemaData)
        foreach (var simpleData in schemaData.SimpleData)
            if (simpleData.Name == attributeName)
                return simpleData.Text;

    return null;
}

// Source: https://stackoverflow.com/a/14998816
public static bool WithinPolygon(CoordinateCollection coordinateCollection, double latitude, double longitude)
{
    var coordinates = coordinateCollection.ToList();

    bool result = false;
    int j = coordinates.Count - 1;

    for (int i = 0; i < coordinates.Count; i++)
    {
        var pointA = coordinates[i];
        var pointB = coordinates[j];

        if (pointA.Longitude < longitude && pointB.Longitude >= longitude || pointB.Longitude < longitude && pointA.Longitude >= longitude)
        {
            if (pointA.Latitude + (longitude - pointA.Longitude) / (pointB.Longitude - pointA.Longitude) * (pointB.Latitude - pointA.Latitude) < latitude)
            {
                result = !result;
            }
        }

        j = i;
    }

    return result;
}`}></CodeBlock>),
    ]
});